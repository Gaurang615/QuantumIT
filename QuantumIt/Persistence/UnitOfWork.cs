using System.Threading.Tasks;
using QuantumIt.Core;

namespace QuantumIt.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private QuantumItDbContext _context { get; }
        public UnitOfWork(QuantumItDbContext context)
        {
            _context = context;

        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}