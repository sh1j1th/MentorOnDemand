using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.MentorLibrary
{
    public class ListTechnologiesDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string TechnologyName { get; set; }
        [Required]
        public string Commission { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
