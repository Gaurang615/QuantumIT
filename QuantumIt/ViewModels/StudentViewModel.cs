using System.ComponentModel.DataAnnotations;

namespace QuantumIt.ViewModels
{
    public class StudentViewModel
    {
        public int studentId { get; set; }

        [Required]
        public int classId { get; set; }

        [Required]
        [StringLength(255)]
        public string firstName { get; set; }

        [Required]
        [StringLength(255)]
        public string surName { get; set; }

        public string fullName { get; set; }

        [Required]
        public int age { get; set; }

        [Required]
        public decimal gpa { get; set; }

    }
}

