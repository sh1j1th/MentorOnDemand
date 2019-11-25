using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.SharedLibrary.Models
{
    public class Payment
    {
        [Required]
        public int Id { get; set; }

        public DateTime LastPaymentDate { get; set; }

        public float BalanceAmount { get; set; }
        public Registration Registration { get; set; }
    }
}
