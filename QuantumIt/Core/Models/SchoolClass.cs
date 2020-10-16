using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuantumIt.Core.Models
{
    [Table("SchoolClasses")]
    public class SchoolClass
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string ClassName { get; set; }

        [Required]
        [StringLength(500)]
        public string Location { get; set; }

        [Required]
        [StringLength(255)]
        public string TeacherName { get; set; }

    }
}