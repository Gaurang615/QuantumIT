using System.ComponentModel.DataAnnotations;

namespace QuantumIt.ViewModels
{
    public class SchoolClassViewModel
    {
        public int classId { get; set; }
       
        [Required]
        public string name { get; set; }

        [Required]
        [StringLength(500)]
        public string classLocation { get; set; }

        [Required]
        [StringLength(255)]
        public string teacherName { get; set; }
    }
}