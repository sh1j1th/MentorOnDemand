using MoD.SharedLibrary.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;


namespace MoD.AdminLibrary
{
    public class AdminContext: IdentityDbContext
    {
        public AdminContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.Entity<RegStudent>().HasKey(r => new { r.RegistrationId, r.StudentId });
            
            builder.Entity<IdentityRole>(r => r.HasData(new IdentityRole
            {
                Id = "1",
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Id = "2",
                Name = "Mentor",
                NormalizedName = "MENTOR"
            },
            new IdentityRole
            {
                Id = "3",
                Name = "Student",
                NormalizedName = "STUDENT"
            }
            ));
            base.OnModelCreating(builder);
        }

        public DbSet<MoDUser> MoDUsers { get; set; }
        public DbSet<Technology> Technologies { get; set; }
        //public DbSet<Course> Courses { get; set; }
        //public DbSet<Payment> Payments { get; set; }
        //public DbSet<Registration> Registrations { get; set; }
        
    }
}




