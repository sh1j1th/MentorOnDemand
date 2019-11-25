using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.StudentLibrary
{
    public class RequestCourseDto
    {
        [Required]
        public int CourseId { get; set; }
        [Required]
        public string StudentEmail { get; set; }
        [Required]
        public DateTime RegDate { get; set; }
        
    }
}
