using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoD.DtoLibrary;
using MoD.SharedLibrary.Models;

namespace MoD.MentorLibrary
{
    public class MentorRepository : IMentorRepository
    {
        MentorContext context;
        public MentorRepository(MentorContext context)
        {
            this.context = context;
        }

        public IEnumerable<CompletedTrainingsDto> CompletedTrainings(string mentorEmail)
        {
            var mentorId = context.MoDUsers.SingleOrDefault(m => m.Email == mentorEmail);
            var trainings = context.Registrations.Where(t => t.Course.MentorUser == mentorId
            && t.IsApproved == true && t.Progress == 100).Select(c => new CompletedTrainingsDto
            {
                Id = c.Id,
                CourseName = c.Course.Name,
                Progress = c.Progress,
                Rating = c.Rating,
                RegistrationDate = c.RegistrationDate,
                UserName = $"{ c.StudentUser.FirstName} {c.StudentUser.LastName}",
                CompletionDate = c.CompletionDate
            });
            return trainings;
        }

        public bool CourseRequestUpdate(int id, bool isApproved)
        {
            var registration = context.Registrations.Find(id);
            registration.IsApproved = isApproved;
            if (!isApproved)    //is not approved
            {
                registration.NotifyReject = true; //iser must be notified
                context.SaveChanges();
                return false;
            }
            context.SaveChanges();
            //add payment part here, need to return an Id when notifying user
            context.Payments.Add(new Payment
            {
                Registration = registration
            }) ;
            return true;

        }

        public bool CreateCourse(CreateCourseDto model)
        {
            try
            {
                var tech = context.Technologies.Find(model.TechnologyId);
                if (tech == null)
                {
                    return false;
                }
                context.Courses.Add(new Course
                {
                    Name = tech.TechnologyName,
                    Description = tech.Description,
                    Price = model.Price,
                    SlotId = Convert.ToInt32(model.SlotId),
                    Technology = tech,
                    MentorUser = context.MoDUsers.SingleOrDefault(c => c.Email == model.MentorEmail)
                }) ;
                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<MentorNotificationDto> GetMessages(string mentorEmail)
        {
            var mentorId = context.MoDUsers.SingleOrDefault(m => m.Email == mentorEmail);
            var messages = context.Registrations.Where(r => r.Course.MentorUser == mentorId 
            && r.IsApproved == false && r.NotifyReject == false).Select(
                c => new MentorNotificationDto
                {
                    RegistrationId = c.Id,
                    CourseName = c.Course.Name,
                    StudentName = $"{c.StudentUser.FirstName} {c.StudentUser.LastName}",
                    RegDate = c.RegistrationDate,
                    Slot = c.Course.SlotId == 1 ? "9:00 AM to 11:00 AM" : (c.Course.SlotId == 2 ? "4:00 PM to 6:00 PM" : "7:00 PM to 9:00 PM")
                }) ;
            return messages;
        }

        public IEnumerable<ListCoursesDto> ListCourses(string mentorEmail)
        {
            var mentor = context.MoDUsers.SingleOrDefault(c => c.Email == mentorEmail);
            
            var mentorId = mentor.Id;
            var courses = context.Courses.Where(c => c.MentorUser.Id == mentorId)
                .Select(c=> new ListCoursesDto
            {
                Id = c.Id,
                CourseName = c.Name,
                Price = c.Price,
                SlotId = c.SlotId,
                Description = c.Description,
                TechnologyId = c.Technology.Id
            });
            return courses;

        }

        public IEnumerable<ListTechnologiesDto> ListTechnologies()
        {
            return context.Technologies.Where(t => t.Status == "Active").Select(c =>
            new ListTechnologiesDto
            {
                Id = c.Id,
                TechnologyName = c.TechnologyName,
                Commission = c.Commission,
                Description = c.Description
            });
        }

        public IEnumerable<OngoingTrainingsDto> OngoingTrainings(string mentorEmail)
        {
            var mentorId = context.MoDUsers.FirstOrDefault(m => m.Email == mentorEmail);
            var trainings = context.Registrations.Where(t => t.Course.MentorUser == mentorId
            && t.IsApproved == true && t.Progress < 100 && t.PaymentDone == true ).Select(c => new OngoingTrainingsDto
            {
                Id = c.Id,
                CourseName = c.Course.Name,
                Progress = c.Progress,
                Rating = c.Rating,
                RegistrationDate = c.RegistrationDate,
                UserName = $"{ c.StudentUser.FirstName} {c.StudentUser.LastName}"
            });
            return trainings;
        }

        public IEnumerable<PaymentHistoryDto> PaymentHistory(string mentorEmail)
        {
            var mentorId = context.MoDUsers.SingleOrDefault(m => m.Email == mentorEmail);
            var result = context.Payments.Where(c => c.Registration.Course.MentorUser == mentorId &&
            c.Registration.IsApproved == true && c.Registration.PaymentDone == true && c.BalanceAmount != 0).Select(t => new PaymentHistoryDto
            {
                Amount = t.BalanceAmount,
                CourseId = t.Registration.Course.Id,
                CourseName = t.Registration.Course.Name,
                PaymentDate = t.LastPaymentDate,
                PaymentId = t.Id,
                RegistrationId = t.Registration.Id
            });
            return result;
        }

    }
}
