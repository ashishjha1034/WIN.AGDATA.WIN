using System.Threading.Tasks;

namespace WIN.AGDATA.WIN.Application.Interfaces
{
    public interface IUnitOfWork
    {
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
