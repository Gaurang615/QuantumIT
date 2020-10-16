using Microsoft.EntityFrameworkCore;
using QuantumIt.Core.Models;

namespace QuantumIt.Persistence
{
    public class QuantumItDbContext : DbContext
    {
        public DbSet<SchoolClass> SchoolClasses { get; set; }
        public DbSet<Student> Students { get; set; }

        public QuantumItDbContext(DbContextOptions<QuantumItDbContext> options): base(options)
        {
            
        }
    }
}