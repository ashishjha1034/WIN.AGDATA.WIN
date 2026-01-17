
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

// ===== Application & Infrastructure =====
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructure(builder.Configuration);

// ===== JWT Configuration =====
var jwtSection = builder.Configuration.GetSection("Jwt");
var secretKey = jwtSection["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey is not configured");
var issuer = jwtSection["Issuer"] ?? throw new InvalidOperationException("JWT Issuer is not configured");
var audience = jwtSection["Audience"] ?? throw new InvalidOperationException("JWT Audience is not configured");

var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

builder.Services
	.AddAuthentication(options =>
	{
		options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	})
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
				if (ctx.Exception is SecurityTokenExpiredException)
					ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
				return Task.CompletedTask;
			}
		};
	});

// ===== Authorization Policies =====
builder.Services.AddAuthorization(options =>
{
	options.DefaultPolicy = new AuthorizationPolicyBuilder()
		.RequireAuthenticatedUser()
		.Build();

	options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
	options.AddPolicy("ManagerOrAdmin", policy => policy.RequireRole("Manager", "Admin"));
	options.AddPolicy("EmployeeOrAbove", policy => policy.RequireRole("Employee", "Manager", "Admin"));
});

// ===== CORS Configuration (define ONCE, before Build) =====
// IMPORTANT: WithOrigins must list EXACT origins (scheme + host + port).
// We include both swagger dev origins and typical Angular dev origins.
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowFrontend", policy =>
	{
		policy.WithOrigins(
				// Swagger served over HTTP in dev
				"http://localhost:5155",
				// Swagger served over HTTPS in dev
				"https://localhost:7113",
				// Typical Angular dev ports (HTTP/HTTPS)
				"http://localhost:4200",
				"https://localhost:4200",
				// Add any custom frontend origins you use
				"http://localhost:3000",
				"https://localhost:3000"
			)
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials(); // only if you use cookies/auth flows needing credentials
	});
});

// ===== Swagger =====
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
	options.SwaggerDoc("v1", new OpenApiInfo
	{
		Title = "WIN.AGDATA.WIN - Reward Points Management System API",
		Version = "v1.0.0",
		Description = "Production-ready API for enterprise reward points system with JWT authentication and role-based access control",
		Contact = new OpenApiContact
		{
			Name = "AGDATA Support",
			Email = "support@agdata.com",
			Url = new Uri("https://agdata.com")
		},
		License = new OpenApiLicense
		{
			Name = "MIT License",
			Url = new Uri("https://opensource.org/licenses/MIT")
		}
	});

	// XML comments (optional, if file exists)
	var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
	var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
	if (File.Exists(xmlPath))
		options.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

	// JWT auth in Swagger
	options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		Name = "Authorization",
		Type = SecuritySchemeType.Http,
		Scheme = "bearer",
		BearerFormat = "JWT",
		Description =
			"JWT Authorization header using the Bearer scheme.\n" +
			"Enter 'Bearer' [space] and then your token.\n" +
			"Example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
	});

	options.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
			},
			Array.Empty<string>()
		}
	});

	options.EnableAnnotations();
	options.OrderActionsBy(apiDesc => $"{apiDesc.ActionDescriptor.RouteValues["controller"]}_{apiDesc.HttpMethod}");
});

// ===== Controllers =====
builder.Services.AddControllers();

var app = builder.Build();

// ===== Swagger UI =====
if (app.Environment.IsDevelopment())
{
	app.UseSwagger(c => { c.SerializeAsV2 = false; });
	app.UseSwaggerUI(options =>
	{
		options.SwaggerEndpoint("/swagger/v1/swagger.json", "Reward Points System API v1.0");
		options.RoutePrefix = string.Empty; // serve at root
		options.DefaultModelsExpandDepth(2);
		options.DefaultModelExpandDepth(2);
		options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.List);
		options.EnableFilter();
		options.ShowCommonExtensions();
		options.DisplayOperationId();
		options.DocumentTitle = "WIN.AGDATA.WIN - API Documentation";
	});
}
else
{
	app.UseExceptionHandler("/error");
}

// ===== Security & CORS (ORDER MATTERS) =====
app.UseHttpsRedirection();     // causes redirect from http://5155 to https://7113 if both profiles are enabled
app.UseCors("AllowFrontend");  // MUST come before auth/authorization to apply to preflight requests
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

// ===== Controllers =====
app.MapControllers();

// ===== Health Check =====
app.MapGet("/health", () =>
	Results.Ok(new
	{
		status = "healthy",
		timestamp = DateTime.UtcNow,
		environment = app.Environment.EnvironmentName
	}))
	.WithName("Health")
	.WithOpenApi()
	.AllowAnonymous();

// ===== DB Init (migrate + seed) =====
using (var scope = app.Services.CreateScope())
{
	try
	{
		var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
		await db.Database.MigrateAsync();
		Console.WriteLine("✓ Database migrations applied successfully");

		await SeedData.SeedAsync(db);
		Console.WriteLine("✓ Database seeding completed successfully");
	}
	catch (Exception ex)
	{
		Console.WriteLine($"✗ Database initialization failed: {ex.Message}");
		throw;
	}
}

app.Run();
