using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

/// <summary>
/// Request body for toggling a user's role
/// </summary>
public class ToggleRoleRequest
{
    /// <summary>
    /// The new role to assign. Must be either 'Admin' or 'Employee'.
    /// </summary>
    [Required(ErrorMessage = "New role is required")]
    public string NewRole { get; set; } = string.Empty;
}
