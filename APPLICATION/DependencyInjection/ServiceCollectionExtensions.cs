using AutoMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace WIN.AGDATA.WIN.APPLICATION.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ServiceCollectionExtensions).Assembly));
        services.AddAutoMapper(typeof(Mappers.UserProfile));

        return services;
    }
}