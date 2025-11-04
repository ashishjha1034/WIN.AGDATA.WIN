using Microsoft.Extensions.DependencyInjection;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Services;

namespace WIN.AGDATA.WIN.Application.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IEventService, EventService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IPointsService, PointsService>();
        services.AddScoped<IPointsManagementService, PointsService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IRedemptionService, RedemptionService>();
        return services;
    }
}
