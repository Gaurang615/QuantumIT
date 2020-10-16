
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuantumIt.Core;
using QuantumIt.Core.Models;

namespace QuantumIt.Persistence
{
    public class SchoolClassRepository : ISchoolClassRepository
    {
        private QuantumItDbContext _context { get; }
        public SchoolClassRepository(QuantumItDbContext context)
        {
           _context = context;
        }
        public async Task<SchoolClass> GetSchoolClassAsync(int id)
        {
            return await _context.SchoolClasses.SingleOrDefaultAsync(cls => cls.Id == id);
        }

        public void AddSchoolClass(SchoolClass schoolClass)
        {
            _context.Add(schoolClass);
        }

        public void RemoveSchoolClass(SchoolClass schoolClass)
        {
            _context.Remove(schoolClass);
        }
    }
}