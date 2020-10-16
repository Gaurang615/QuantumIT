using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuantumIt.Core;
using QuantumIt.Core.Models;

namespace QuantumIt.Persistence
{
    public class StudentRepository : IStudentRepository
    {
        private QuantumItDbContext _context { get; }
        public StudentRepository(QuantumItDbContext context)
        {
            _context = context;
        }

        public async Task<Student> GetStudent(int id)
        {
            return await _context.Students.SingleOrDefaultAsync(cls => cls.StudentId == id);
        }

        public IQueryable<Student> GetStudentByClass(int classId)
        {
            return _context.Students.Where(cls => cls.ClassId == classId);
        }

        public void AddStudent(Student student)
        {
            _context.Add(student);
        }

        public void RemoveStudent(Student student)
        {
            _context.Remove(student);
        }
    }
}