using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.StudentLibrary
{
    public class SearchCoursesStudentDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string CourseName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string Slot { get; set; }
        [Required]
        public string MentorName { get; set; }
        [Required]
        public int MentorRating { get; set; }
    }
}
