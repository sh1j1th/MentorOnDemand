using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.SharedLibrary.Models
{
    public class MoDUser: IdentityUser
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public bool IsEnabled { get; set; }
        public int Experience { get; set; }
        public int Rating { get; set; }
        [EmailAddress]
        public string LinkedInURL { get; set; }

    }
}
