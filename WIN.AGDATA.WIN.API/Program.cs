using System.Xml.Linq;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Services;
using WIN_AGDATA_WIN.Application.Interfaces;
using WIN_AGDATA_WIN.Application.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container        
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "AGDATA Reward Points API", Version = "v1" });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Register our application services manually (since DI extension might have issues)
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<IEventService, EventService>();
builder.Services.AddSingleton<IProductService, ProductService>();
builder.Services.AddSingleton<IPointsService, PointsService>();
builder.Services.AddSingleton<IRedemptionService>(provider =>
{
    var userService = provider.GetRequiredService<IUserService>();
    var productService = provider.GetRequiredService<IProductService>();
    return new RedemptionService(userService, productService);
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "AGDATA Reward Points API v1");
        c.RoutePrefix = string.Empty; // Serve at root
    });
}
app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Global error handling middleware
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (System.Exception ex)
    {
        // Check if it's our DomainException
        if (ex.GetType().Name == "DomainException")
        {
            context.Response.StatusCode = 400; // Bad Request
            await context.Response.WriteAsJsonAsync(new { error = ex.Message });
        }
        else
        {
            context.Response.StatusCode = 500; // Internal Server Error
            await context.Response.WriteAsJsonAsync(new { error = "An unexpected error occurred" });

            // Log the exception
            var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "Unhandled exception occurred");
        }
    }
});

// Seed some sample data
await SeedSampleData(app);

app.Run();

// Sample data seeding method
async Task SeedSampleData(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var userService = scope.ServiceProvider.GetRequiredService<IUserService>();
    var productService = scope.ServiceProvider.GetRequiredService<IProductService>();
    var eventService = scope.ServiceProvider.GetRequiredService<IEventService>();

    try
    {
        // Seed sample users
        userService.CreateUser("EMP001", "john.doe@agdata.com", "John", "Doe");
        userService.CreateUser("EMP002", "jane.smith@agdata.com", "Jane", "Smith");

        // Seed sample products
        productService.CreateProduct("Wireless Mouse", "Ergonomic wireless mouse", 500, 10);
        productService.CreateProduct("Company T-Shirt", "Official AGDATA t-shirt", 300, 25);
        productService.CreateProduct("Noise Cancelling Headphones", "Premium headphones", 1500, 5);

        // Seed sample event
        var prizeTiers = new List<WIN.AGDATA.WIN.Domain.Entities.Events.PrizeTier>
        {
            new WIN.AGDATA.WIN.Domain.Entities.Events.PrizeTier(1, 1000, "First Prize"),
            new WIN.AGDATA.WIN.Domain.Entities.Events.PrizeTier(2, 500, "Second Prize"),
            new WIN.AGDATA.WIN.Domain.Entities.Events.PrizeTier(3, 250, "Third Prize")
        };

        eventService.CreateEvent(
            "Hackathon 2024",
            "Annual coding competition",
            DateTime.Now.AddDays(7),
            prizeTiers
        );

        Console.WriteLine("Sample data seeded successfully!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error seeding sample data: {ex.Message}");
    }
}