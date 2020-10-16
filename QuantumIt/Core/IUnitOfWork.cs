using System.Threading.Tasks;

namespace QuantumIt.Core
{
    public interface IUnitOfWork
    {   
        /// <summary>
        /// Save and commit changes
        /// </summary>
        /// <returns></returns>
        Task CompleteAsync();
    }
}