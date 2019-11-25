using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.MentorLibrary
{
    public class ListCoursesDto
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
        public int SlotId { get; set; }
        [Required]
        public int TechnologyId { get; set; }
    }
}
