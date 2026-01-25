using Humanizer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using WIN.AGDATA.WIN.API.Extensions;
using WIN.AGDATA.WIN.API.Middleware;
using WIN.AGDATA.WIN.APPLICATION.DependencyInjection;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// =======================================================
// Application & Infrastructure
// =======================================================
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructure(builder.Configuration);

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

	options.AddPolicy("PasswordChanged", policy =>
		policy.RequireAssertion(context =>
		{
			var isAdmin = context.User.IsInRole("Admin");
			var pwdChangedClaim = context.User.FindFirst("pwdChanged")?.Value;
			return isAdmin || pwdChangedClaim == "true";
		}));
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
// Database Init (Migrate + Seed)
// =======================================================
using (var scope = app.Services.CreateScope())
{
	try
	{
		var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
		await db.Database.MigrateAsync();
		await SeedData.SeedAsync(db);

		Console.WriteLine("✓ Database initialized successfully");
	}
	catch (Exception ex)
	{
		Console.WriteLine($"✗ Database initialization failed: {ex.Message}");
		throw;
	}
}

app.Run();
