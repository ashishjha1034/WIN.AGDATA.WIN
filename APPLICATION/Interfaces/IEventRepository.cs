using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IEventRepository
{
    Task<Event?> GetByIdAsync(Guid id);
    Task<IReadOnlyList<Event>> GetAllAsync();
    Task<Event?> GetByIdWithParticipantsAsync(Guid id);
    void Add(Event @event);
    Task UpdateAsync(Event @event);
}
