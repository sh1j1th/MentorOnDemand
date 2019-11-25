using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.MentorLibrary
{
    public class CreateCourseDto
    {
        [Required]
        public string MentorEmail { get; set; }
        [Required]
        public int TechnologyId { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string SlotId { get; set; }
    }
}
