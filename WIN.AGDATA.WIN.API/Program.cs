using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WIN.AGDATA.WIN.API.Extensions;
using WIN.AGDATA.WIN.API.Middleware;
using WIN.AGDATA.WIN.APPLICATION.DependencyInjection;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Infrastructure.DependencyInjection;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Models;
using WIN.AGDATA.WIN.API.Extensions;


var builder = WebApplication.CreateBuilder(args);

// ===== Add Services =====

// Application & Infrastructure
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructure(builder.Configuration);

// ===== JWT Configuration =====
var jwtSettings = builder.Configuration.GetSection("Jwt");
var secretKey = jwtSettings["SecretKey"]
    ?? throw new InvalidOperationException("JWT SecretKey is not configured");
var issuer = jwtSettings["Issuer"]
    ?? throw new InvalidOperationException("JWT Issuer is not configured");
var audience = jwtSettings["Audience"]
    ?? throw new InvalidOperationException("JWT Audience is not configured");

var key = Encoding.UTF8.GetBytes(secretKey);

builder.Services.AddAuthentication(options =>
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
});

// ===== CORS Configuration =====
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var allowedOrigins = builder.Configuration["Cors:AllowedOrigins"]?
            .Split(",", StringSplitOptions.RemoveEmptyEntries)
            ?? new[] { "http://localhost:3000", "http://localhost:4200" };

        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// ===== Swagger Configuration =====
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

    // Include XML Comments
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
        options.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);

    // JWT Bearer Token Security
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type =  SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = @"JWT Authorization header using the Bearer scheme. 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      Example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'"
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
            new string[] { }
        }
    });

    // Enable annotations
    options.EnableAnnotations();
    options.OrderActionsBy(apiDesc => $"{apiDesc.ActionDescriptor.RouteValues["controller"]}_{apiDesc.HttpMethod}");
});

// ===== Controllers & Services =====
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// ===== Configure Middleware =====
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(options =>
    {
        options.SerializeAsV2 = false;
    });

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Reward Points System API v1.0");
        options.RoutePrefix = string.Empty; // Swagger at root
        options.DefaultModelsExpandDepth(2);
        options.DefaultModelExpandDepth(2);
        options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.List);
        options.EnableFilter();
        options.ShowCommonExtensions();
        options.DisplayOperationId();
        options.DocumentTitle = "WIN.AGDATA.WIN - API Documentation";
    });
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
}

// ===== Security & CORS =====
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

// ===== Exception Handling =====
app.UseMiddleware<ExceptionHandlingMiddleware>();

// ===== Authentication & Authorization =====
app.UseAuthentication();
app.UseAuthorization();

// ===== Controllers =====
app.MapControllers();

// ===== Health Check Endpoint =====
app.MapGet("/health", () =>
    Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow, environment = app.Environment.EnvironmentName }))
    .WithName("Health")
    .WithOpenApi()
    .AllowAnonymous();

// ===== Database Initialization =====
using (var scope = app.Services.CreateScope())
{
    try
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        // Run migrations
        await dbContext.Database.MigrateAsync();
        Console.WriteLine("✓ Database migrations applied successfully");

        // Run seeding
        await SeedData.SeedAsync(dbContext);
        Console.WriteLine("✓ Database seeding completed successfully");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"✗ Database initialization failed: {ex.Message}");
        throw;
    }
}

app.Run();
