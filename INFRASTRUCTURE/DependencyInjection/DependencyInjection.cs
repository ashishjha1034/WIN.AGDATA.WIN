using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Infrastructure.Repositories;

namespace WIN.AGDATA.WIN.Infrastructure.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IRedemptionRepository, RedemptionRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}