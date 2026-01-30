using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.Infrastructure.Services;

/// <summary>
/// Background service for automated event lifecycle transitions.
/// Runs every minute and applies the following rules to Draft events:
/// 
/// 1. Auto-Go-Live: When EventDate (event start time) arrives → Draft → Active
/// 2. Auto-Cancel: When RegistrationEndDate passes AND registered participants = 0 → Draft → Cancelled
/// 
/// Rule 1 takes precedence: if event start arrives, go live regardless of registrations.
/// </summary>
public class EventLifecycleBackgroundService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<EventLifecycleBackgroundService> _logger;
    
    /// <summary>
    /// Interval between lifecycle checks (default: 1 minute)
    /// </summary>
    private static readonly TimeSpan CheckInterval = TimeSpan.FromMinutes(1);

    public EventLifecycleBackgroundService(
        IServiceScopeFactory scopeFactory,
        ILogger<EventLifecycleBackgroundService> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("EventLifecycleBackgroundService starting...");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await ProcessAutomatedTransitionsAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing event lifecycle transitions");
            }

            await Task.Delay(CheckInterval, stoppingToken);
        }

        _logger.LogInformation("EventLifecycleBackgroundService stopping...");
    }

    /// <summary>
    /// Processes all automated transitions for Draft events.
    /// </summary>
    private async Task ProcessAutomatedTransitionsAsync(CancellationToken ct)
    {
        using var scope = _scopeFactory.CreateScope();
        var eventRepository = scope.ServiceProvider.GetRequiredService<IEventRepository>();
        var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

        var nowUtc = DateTime.UtcNow;

        // Get all Draft events (candidates for transition)
        var allEvents = await eventRepository.GetAllAsync();
        var draftEvents = allEvents
            .Where(e => e.Status == EventStatus.Draft)
            .ToList();

        if (draftEvents.Count == 0)
            return;

        var activatedCount = 0;
        var cancelledCount = 0;

        foreach (var @event in draftEvents)
        {
            try
            {
                // Rule 1: Auto-Go-Live when event start time arrives (takes precedence)
                if (@event.ShouldAutoActivate(nowUtc))
                {
                    @event.AutoActivate();
                    activatedCount++;
                    _logger.LogInformation(
                        "Auto-GoLive: Event {EventId} ({EventName}) → Active. EventDate: {EventDate}",
                        @event.Id, @event.Name, @event.EventDate.ToString("o"));
                    continue; // Skip cancel check
                }

                // Rule 2: Auto-Cancel when registration deadline passes with 0 registrations
                if (@event.ShouldAutoCancel(nowUtc))
                {
                    @event.AutoCancel();
                    cancelledCount++;
                    _logger.LogInformation(
                        "Auto-Cancel: Event {EventId} ({EventName}) → Cancelled. RegistrationEndDate: {RegEnd}, Participants: 0",
                        @event.Id, @event.Name, @event.RegistrationEndDate?.ToString("o"));
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, 
                    "Failed to process automated transition for event {EventId} ({EventName})", 
                    @event.Id, @event.Name);
            }
        }

        // Save all changes in a single transaction
        if (activatedCount > 0 || cancelledCount > 0)
        {
            await unitOfWork.SaveChangesAsync(ct);
            _logger.LogInformation(
                "Lifecycle batch complete: {Activated} activated, {Cancelled} cancelled",
                activatedCount, cancelledCount);
        }
    }
}
