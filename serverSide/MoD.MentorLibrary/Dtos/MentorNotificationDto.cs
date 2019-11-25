using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.MentorLibrary
{
    public class MentorNotificationDto
    {
        [Required]
        public int RegistrationId { get; set; }
        [Required]
        public string CourseName { get; set; }
        [Required]
        public string StudentName { get; set; }
        [Required]
        public string Slot { get; set; }
        [Required]
        public DateTime RegDate { get; set; }
    }
}
