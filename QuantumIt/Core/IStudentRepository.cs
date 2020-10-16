using System.Linq;
using QuantumIt.Core.Models;
using System.Threading.Tasks;

namespace QuantumIt.Core
{
    public interface IStudentRepository
    {
        /// <summary>
        /// Get Student
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Student> GetStudent(int id);

        /// <summary>
        /// Get students by class
        /// </summary>
        /// <param name="classId"></param>
        /// <returns></returns>
        IQueryable<Student> GetStudentByClass(int classId);

        /// <summary>
        /// Add Student
        /// </summary>
        /// <param name="student"></param>
        void AddStudent(Student student);

        /// <summary>
        /// Remove Student
        /// </summary>
        /// <param name="student"></param>
        void RemoveStudent(Student student);

    }
}