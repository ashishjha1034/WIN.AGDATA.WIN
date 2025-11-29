
namespace WIN.AGDATA.WIN.Domain.Common
{
    public interface IActivatable
    {
        bool IsActive { get; }
        void Activate(string modifiedBy = "SYSTEM");
        void Deactivate(string reason, string modifiedBy = "SYSTEM");
    }
}
