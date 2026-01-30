using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class Role : Entity<Guid>
{
    public string Name { get; private set; } = null!;
    public string? Description { get; private set; }
    public bool IsActive { get; private set; }

    private Role() { }

    public Role(string name, string? description = null)
        : base(Guid.NewGuid())
    {
        Name = name;
        Description = description;
        IsActive = true;
    }
    public static Role Create(string name, string? description = null)
    {
        return new Role(name, description);
    }
}