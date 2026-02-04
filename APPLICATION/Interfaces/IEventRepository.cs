using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IEventRepository
{
    Task<Event?> GetByIdAsync(Guid id);
    Task<IReadOnlyList<Event>> GetAllAsync();
    Task<Event?> GetByIdWithParticipantsAsync(Guid id);
    Task<IReadOnlyList<Event>> GetRecentEventsAsync(int count = 5);
    Task<IReadOnlyList<Event>> GetUserEventsAsync(Guid userId);
    Task<bool> IsUserRegisteredForEventAsync(Guid eventId, Guid userId);
    Task AddParticipantAsync(Guid eventId, Guid userId);
    void Add(Event @event);
    Task UpdateAsync(Event @event);
    Task<(int ActiveEventRegistrations, int CompletedEventCount)> GetUserEventRegistrationStatsAsync(Guid userId);
    
    /// <summary>
    /// Checks if an event with the given name already exists (case-insensitive).
    /// </summary>
    /// <param name="name">Event name to check</param>
    /// <param name="excludeEventId">Optional event ID to exclude (for edit scenarios)</param>
    /// <returns>True if the name exists, false otherwise</returns>
    Task<bool> ExistsByNameAsync(string name, Guid? excludeEventId = null);
    
    /// <summary>
    /// Gets the total count of all event registrations (participants) across all events.
    /// </summary>
    /// <returns>Total number of event registrations</returns>
    Task<int> GetTotalEventRegistrationsAsync();
    
    /// <summary>
    /// Saves changes to the database. Used for compute-on-read automated transitions.
    /// </summary>
    Task SaveChangesAsync(CancellationToken ct = default);
}
