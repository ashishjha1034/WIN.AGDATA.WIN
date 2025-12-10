using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class Role : Entity<Guid>
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
    public string? Description { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private Role() { }

    public Role(string name, string? description = null)
    {
        Id = Guid.NewGuid();
        Name = name;
        Description = description;
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
    }
    public static Role Create(string name, string? description = null)
    {
        return new Role
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = description,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
    }
}