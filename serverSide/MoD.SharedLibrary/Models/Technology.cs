using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.SharedLibrary.Models
{
    public class Technology
    {
        public int Id { get; set; }
        [Required]
        public string TechnologyName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Commission { get; set; }
        [Required]
        [Url]
        public string ImageURL { get; set; }
        [Required]
        public string Status { get; set; }
        
    }
}
