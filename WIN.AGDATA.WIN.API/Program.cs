// WIN.AGDATA.WIN.API/Program.cs
using APPLICATION.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.OpenApi.Models;
using WIN.AGDATA.WIN.API.Extensions;
using WIN.AGDATA.WIN.API.Middleware;
using WIN.AGDATA.WIN.API.Validation;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.Application.DependencyInjection;
using WIN.AGDATA.WIN.APPLICATION.Validators;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Infrastructure.DependencyInjection;
using WIN.AGDATA.WIN.Infrastructure.Repositories;
using WIN.AGDATA.WIN.Infrastructure.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

// Add infrastructure and application services (your extension methods)
builder.Services
    .AddInfrastructure(builder.Configuration)
    .AddApplication();

// Add API / MVC services
builder.Services.AddControllers(options =>
{
    // keep MVC options here if needed
}).AddJsonOptions(opts =>
{
    // optional: configure JSON options if required
});

// Register CORS (keeps your existing "AllowAll" policy)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// FluentValidation: automatic registration of validators in this assembly
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddScoped<IUnitOfWork, EfUnitOfWork>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IRedemptionRepository, RedemptionRepository>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(WIN.AGDATA.WIN.Application.Commands.CreateRedemptionCommand).Assembly));

builder.Services.AddValidatorsFromAssembly(typeof(CreateRedemptionCommandValidator).Assembly);
builder.Services.AddValidatorsFromAssembly(typeof(CreateUserCommandValidator).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<RedemptionRequestValidator>();


// Add the API helper extension (if exists) which registers controllers/swagger etc.
if (typeof(WIN.AGDATA.WIN.API.Extensions.ServiceCollectionExtensions).Assembly != null)
{
    // optional: call AddApiServices if you prefer the centralized extension
    try { builder.Services.AddApiServices(); } catch { /* ignore if already configured */ }
}

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "WIN.AGDATA.WIN API", Version = "v1" });
});

// Logging, etc. (already available via builder)

// Build app
var app = builder.Build();

// Seed in development (your existing approach)
if (app.Environment.IsDevelopment())
{
    // ensure DB seeding does not crash startup
    try
    {
        using var scope = app.Services.CreateScope();
        var seedService = scope.ServiceProvider.GetRequiredService<SeedDataService>();
        await seedService.SeedAsync();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Seed error: {ex.Message}");
    }

    app.UseSwagger();
    app.UseSwaggerUI();
}

// Global middleware
app.UseHttpsRedirection();
app.UseCors("AllowAll");

// global exception middleware (you have one present in project)
app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

app.UseAuthorization();
app.MapControllers();

await app.RunAsync();
