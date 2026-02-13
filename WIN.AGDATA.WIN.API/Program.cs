using FluentValidation;
using FluentValidation.AspNetCore;
using Humanizer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Threading.RateLimiting;
using WIN.AGDATA.WIN.API.Extensions;
using WIN.AGDATA.WIN.API.Middleware;
using WIN.AGDATA.WIN.APPLICATION.DependencyInjection;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Infrastructure.DependencyInjection;
using WIN.AGDATA.WIN.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// =======================================================
// Application & Infrastructure
// =======================================================
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructure(builder.Configuration);

// =======================================================
// Background Services - Event Lifecycle Automation
// =======================================================
builder.Services.AddHostedService<EventLifecycleBackgroundService>();

// =======================================================
// FluentValidation - Auto validation with ModelState
// =======================================================
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();

// =======================================================
// Rate Limiting - Auth Endpoints Protection
// =======================================================
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    
    // Login endpoint: 10 requests per 5 minutes per IP
    options.AddPolicy("LoginRateLimit", context =>
        RateLimitPartition.GetSlidingWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new SlidingWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromMinutes(5),
                SegmentsPerWindow = 5,
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 0
            }));
    
    // Forgot Password endpoint: 5 requests per 10 minutes per IP
    options.AddPolicy("ForgotPasswordRateLimit", context =>
        RateLimitPartition.GetSlidingWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new SlidingWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(10),
                SegmentsPerWindow = 5,
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 0
            }));
    
    // Validation endpoints: 30 requests per minute per IP (to support debounced checks)
    options.AddPolicy("ValidationRateLimit", context =>
        RateLimitPartition.GetSlidingWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new SlidingWindowRateLimiterOptions
            {
                PermitLimit = 30,
                Window = TimeSpan.FromMinutes(1),
                SegmentsPerWindow = 6,
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 0
            }));
});

// =======================================================
// JWT Configuration
// =======================================================
var jwtSection = builder.Configuration.GetSection("Jwt");

var secretKey = jwtSection["SecretKey"]
	?? throw new InvalidOperationException("JWT SecretKey is not configured");

var issuer = jwtSection["Issuer"]
	?? throw new InvalidOperationException("JWT Issuer is not configured");

var audience = jwtSection["Audience"]
	?? throw new InvalidOperationException("JWT Audience is not configured");

var signingKey = new SymmetricSecurityKey(
	Encoding.UTF8.GetBytes(secretKey)
);

// =======================================================
// Authentication (JWT Bearer)
// =======================================================
builder.Services
	.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = signingKey,

			ValidateIssuer = true,
			ValidIssuer = issuer,

			ValidateAudience = true,
			ValidAudience = audience,

			ValidateLifetime = true,
			ClockSkew = TimeSpan.Zero
		};

		options.Events = new JwtBearerEvents
		{
			OnAuthenticationFailed = ctx =>
			{
				Console.WriteLine($"[JWT] Authentication failed: {ctx.Exception.Message}");
				return Task.CompletedTask;
			},
			OnChallenge = ctx =>
			{
				Console.WriteLine($"[JWT] Challenge: {ctx.Error} - {ctx.ErrorDescription}");
				return Task.CompletedTask;
			},
			OnMessageReceived = ctx =>
			{
				var token = ctx.Request.Headers["Authorization"]
					.FirstOrDefault()?
					.Split(" ")
					.Last();

				if (!string.IsNullOrWhiteSpace(token))
				{
					ctx.Token = token;
				}

				return Task.CompletedTask;
			}
		};
	});

// =======================================================
// Authorization
// =======================================================
builder.Services.AddAuthorization(options =>
{
	options.DefaultPolicy = new AuthorizationPolicyBuilder()
		.RequireAuthenticatedUser()
		.Build();

	options.AddPolicy("AdminOnly", policy =>
		policy.RequireRole("Admin"));

	options.AddPolicy("ManagerOrAdmin", policy =>
		policy.RequireRole("Manager", "Admin"));

	options.AddPolicy("EmployeeOrAbove", policy =>
		policy.RequireRole("Employee", "Manager", "Admin"));

	// PasswordChanged policy - now allows ALL authenticated users
	// Password change requirement has been removed from the system
	options.AddPolicy("PasswordChanged", policy =>
		policy.RequireAuthenticatedUser());
});

// =======================================================
// CORS
// =======================================================
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowFrontend", policy =>
	{
		policy.WithOrigins(
				"http://localhost:5155",
				"https://localhost:7113",
				"http://localhost:4200",
				"https://localhost:4200",
				"http://localhost:3000",
				"https://localhost:3000"
			)
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
});

// =======================================================
// Swagger
// =======================================================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
	options.SwaggerDoc("v1", new OpenApiInfo
	{
		Title = "WIN.AGDATA.WIN - Reward Points API",
		Version = "v1.0.0",
		Description = "JWT secured API with role-based authorization"
	});

	// JWT Support in Swagger
	options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		Name = "Authorization",
		Type = SecuritySchemeType.Http,
		Scheme = "Bearer",
		BearerFormat = "JWT",
		In = ParameterLocation.Header,
		Description = "Paste ONLY the JWT token. Do NOT prefix with Bearer."
	});

	options.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				}
			},
			Array.Empty<string>()
		}
	});

	options.EnableAnnotations();
});

// =======================================================
// Controllers
// =======================================================
builder.Services.AddControllers();

var app = builder.Build();

// =======================================================
// JWT Config Debug (Startup Log)
// =======================================================
using (var scope = app.Services.CreateScope())
{
	var cfg = scope.ServiceProvider.GetRequiredService<IConfiguration>();
	Console.WriteLine($"[JWT] Issuer   = {cfg["Jwt:Issuer"]}");
	Console.WriteLine($"[JWT] Audience = {cfg["Jwt:Audience"]}");
	Console.WriteLine($"[JWT] Secret   = {(string.IsNullOrWhiteSpace(cfg["Jwt:SecretKey"]) ? "MISSING" : "PRESENT")}");
}

// =======================================================
// Swagger UI
// =======================================================
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(options =>
	{
		options.SwaggerEndpoint("/swagger/v1/swagger.json", "WIN.AGDATA.WIN API v1");
		options.RoutePrefix = string.Empty;
		options.DisplayOperationId();
		options.EnableFilter();
	});
}
else
{
	app.UseExceptionHandler("/error");
}

// =======================================================
// Middleware Order (CRITICAL)
// =======================================================
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Rate Limiting (before auth)
app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

// =======================================================
// Routes
// =======================================================
app.MapControllers();

// =======================================================
// Health Check
// =======================================================
app.MapGet("/health", () =>
	Results.Ok(new
	{
		status = "healthy",
		timestamp = DateTime.UtcNow,
		environment = app.Environment.EnvironmentName
	}))
	.AllowAnonymous();

// =======================================================
// Database Init
// =======================================================
// Skip seeding when in Testing environment - tests handle their own seed data
if (!app.Environment.IsEnvironment("Testing"))
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        
        try
        {
            // Ensure database is created and migrations are applied
            // NOTE: Migrations already applied manually via 'dotnet ef database update'
            // Comment out to avoid re-running migrations on every startup
            // await dbContext.Database.MigrateAsync();
            // logger.LogInformation("✓ Database migrations applied");
            
            // Seed initial data (only creates admin if no users exist)
            await DatabaseSeeder.SeedAsync(dbContext, logger);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error during database initialization");
            throw;
        }
    }
}

Console.WriteLine("Starting application...");
app.Run();
Console.WriteLine("Application ended.");

// Partial class to make Program public for WebApplicationFactory in integration tests
public partial class Program { }