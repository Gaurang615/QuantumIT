using System.Threading.Tasks;
using QuantumIt.Core.Models;

namespace QuantumIt.Core
{
    public interface ISchoolClassRepository
    {
        /// <summary>
        /// Get class by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<SchoolClass> GetSchoolClassAsync(int id);

        /// <summary>
        /// Add school class
        /// </summary>
        /// <param name="schoolClass"></param>
        void AddSchoolClass(SchoolClass schoolClass);
        
        /// <summary>
        /// Remove class
        /// </summary>
        /// <param name="schoolClass"></param>
        void RemoveSchoolClass(SchoolClass schoolClass);
    }
}