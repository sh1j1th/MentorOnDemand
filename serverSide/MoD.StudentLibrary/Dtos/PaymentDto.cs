using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.StudentLibrary
{
    public class PaymentDto
    {
        [Required]
        public int RegistrationId { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string UpiId { get; set; }
        [Required]
        public int PaymentId { get; set; }
    }
}
