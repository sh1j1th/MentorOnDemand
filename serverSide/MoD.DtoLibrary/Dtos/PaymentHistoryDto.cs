using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.DtoLibrary
{
    public class PaymentHistoryDto
    {
        public DateTime PaymentDate { get; set; }
        public float Amount { get; set; }
        public string CourseName { get; set; }
        public int CourseId { get; set; }
        public int PaymentId { get; set; }
        public int RegistrationId { get; set; }
    }
}
