
namespace WIN.AGDATA.WIN.Domain.Common
{

    public interface IActivatable
    {
        bool IsActive { get; }
        void Activate();
        void Deactivate(string reason);
    }
}
