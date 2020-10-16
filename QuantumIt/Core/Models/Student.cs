using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuantumIt.Core.Models
{
    [Table("Students")]
    public class Student
    {
        public int StudentId { get; set; }

        [ForeignKey("SchoolClasses")]
        public int ClassId { get; set; }

        [Required]
        [StringLength(255)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(255)]
        public string SurName { get; set; }

        [Required]
        public int Age { get; set; }

        [Column(TypeName = "decimal(2,1)")]
        public decimal GPA { get; set; }

    }
}