using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.DtoLibrary
{
    public class CompletedTrainingsDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public DateTime RegistrationDate { get; set; }
        [Required]
        public int Progress { get; set; }
        [Required]
        public int Rating { get; set; }
        [Required]
        public string CourseName { get; set; }
        [Required]
        public String UserName { get; set; }
        [Required]
        public DateTime CompletionDate { get; set; }
    }
}
