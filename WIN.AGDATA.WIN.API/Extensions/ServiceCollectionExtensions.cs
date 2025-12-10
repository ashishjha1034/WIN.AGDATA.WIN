using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using WIN.AGDATA.WIN.APPLICATION.DependencyInjection;
using WIN.AGDATA.WIN.Infrastructure.DependencyInjection;

namespace WIN.AGDATA.WIN.API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Add Application & Infrastructure services
        services.AddApplicationServices();
        services.AddInfrastructure(configuration);

        // ===== JWT Configuration =====
        var jwtSettings = configuration.GetSection("Jwt");
        var secretKey = jwtSettings["SecretKey"]
            ?? throw new InvalidOperationException("JWT SecretKey is not configured");
        var issuer = jwtSettings["Issuer"]
            ?? throw new InvalidOperationException("JWT Issuer is not configured");
        var audience = jwtSettings["Audience"]
            ?? throw new InvalidOperationException("JWT Audience is not configured");

        var key = Encoding.UTF8.GetBytes(secretKey);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = issuer,
                ValidateAudience = true,
                ValidAudience = audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    if (context.Exception is SecurityTokenExpiredException)
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;

                    return Task.CompletedTask;
                }
            };
        });

        // ===== Authorization Policies =====
        services.AddAuthorization(options =>
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
        });

        // ===== CORS Configuration =====
        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", policy =>
            {
                policy
                    .WithOrigins(configuration["Cors:AllowedOrigins"]?.Split(",") ?? new[] { "http://localhost:3000" })
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        });

        // ===== Controllers & Swagger =====
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Enter your JWT token"
            });

            options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
            {
                {
                    new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                    {
                        Reference = new Microsoft.OpenApi.Models.OpenApiReference
                        {
                            Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                }
            });
        });

        return services;
    }
}
