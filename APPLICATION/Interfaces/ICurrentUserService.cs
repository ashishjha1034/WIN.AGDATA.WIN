namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface ICurrentUserService
{
    Guid GetCurrentUserId();
    string GetCurrentUserEmail();
    string GetCurrentUserName();
    bool IsInRole(string roleName);
    bool IsAdmin();
}
