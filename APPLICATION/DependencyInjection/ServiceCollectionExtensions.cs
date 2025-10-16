using Microsoft.Extensions.DependencyInjection;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Services;

namespace WIN.AGDATA.WIN.Application.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IEventService, EventService>();
        // services.AddScoped<IProductService, ProductService>();  // Comment out temporarily
        // services.AddScoped<IRedemptionService, RedemptionService>(); // Comment out temporarily

        return services;
    }
}
