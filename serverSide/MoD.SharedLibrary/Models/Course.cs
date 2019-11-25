using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.SharedLibrary.Models
{
    public class Course
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        //[MaxLength(100)]
        public string Description { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public int SlotId { get; set; }     //create individual courses for each slot
        [Required]
        public Technology Technology { get; set; }
        [Required]
        public MoDUser MentorUser { get; set; }
    }
}
