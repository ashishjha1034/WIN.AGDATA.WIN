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
    /// Saves changes to the database. Used for compute-on-read automated transitions.
    /// </summary>
    Task SaveChangesAsync(CancellationToken ct = default);
}
