using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.StudentLibrary
{
    public class RejectNotificationDto
    {
        [Required]
        public string CourseName { get; set; }
        [Required]
        public DateTime RequestDate { get; set; }
        [Required]
        public string MentorName { get; set; }
        [Required]
        public string Slot { get; set; }
    }
}
