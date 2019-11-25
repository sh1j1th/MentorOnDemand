using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.SharedLibrary.Models
{
    public class Registration
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
        public Course Course { get; set; }
        [Required]
        public MoDUser StudentUser { get; set; }
        [Required]
        public bool IsApproved { get; set; } 
        [Required]
        public bool NotifyReject { get; set; }
        [Required]
        public bool NotifyApprove { get; set; }
        [Required]
        public bool PaymentDone { get; set; }
        public DateTime CompletionDate { get; set; }
    }
}
