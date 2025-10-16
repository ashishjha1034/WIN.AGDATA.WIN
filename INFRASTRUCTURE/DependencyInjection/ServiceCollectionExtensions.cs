using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Infrastructure.Repositories;
using WIN.AGDATA.WIN.Infrastructure.Services;
using WIN.AGDATA.WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.Infrastructure.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        // Add ALL repository registrations
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IEventRepository, EventRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();
        //services.AddScoped<IProductRepository, ProductRepository>();
        //services.AddScoped<IRedemptionRepository, RedemptionRepository>();

        services.AddScoped<IPointsManagementService, PointsManagementService>();

        return services;
    }
}
