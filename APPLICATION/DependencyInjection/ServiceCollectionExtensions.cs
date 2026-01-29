using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace WIN.AGDATA.WIN.APPLICATION.DependencyInjection;

/// <summary>
/// Application layer dependency injection extensions
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Add application services to DI container
    /// </summary>
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // ✅ Add MediatR for CQRS
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(typeof(ServiceCollectionExtensions).Assembly));

        // ✅ Add AutoMapper for DTO mapping
        services.AddAutoMapper(typeof(ServiceCollectionExtensions).Assembly);

        // ✅ Add FluentValidation validators
        services.AddValidatorsFromAssembly(typeof(ServiceCollectionExtensions).Assembly);

        return services;
    }
}
