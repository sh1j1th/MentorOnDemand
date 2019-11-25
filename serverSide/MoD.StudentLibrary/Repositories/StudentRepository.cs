using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoD.DtoLibrary;
using MoD.SharedLibrary.Models;

namespace MoD.StudentLibrary
{
    public class StudentRepository : IStudentRepository
    {
        StudentContext context;
        public StudentRepository(StudentContext context)
        {
            this.context = context;
        }

        public bool AddRating(int registrationId, int value)
        {
            try
            {
                var registration = context.Registrations.Where(c => c.Id == registrationId).Include(co => co.Course).ThenInclude(m => m.MentorUser).First();
                var mentor = context.MoDUsers.SingleOrDefault(c => c == registration.Course.MentorUser);
                var ratingValue = context.Registrations.Where(co => co.Course.MentorUser == mentor).Sum(c => c.Rating);
                var ratingCount = context.Registrations.Where(co => co.Course.MentorUser == mentor).Count();
                mentor.Rating = registration.Rating == 1 || value == 1? (ratingValue + value) / (ratingCount) : (ratingValue + value) / (ratingCount + 1);
                registration.Rating = value;
                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool AddProgress(int registrationId, int value)
        {
            try
            {
                var registration = context.Registrations.Where(r => r.Id == registrationId)
                     .Include(co => co.Course)
                     .ThenInclude(t => t.Technology)
                     .FirstOrDefault();
                var techCommission = Convert.ToInt32(registration.Course.Technology.Commission);
                var coursePrice = registration.Course.Price;

                var initialProgress = registration.Progress;
                registration.Progress = value;
                if (value == 100)
                {
                    registration.CompletionDate = System.DateTime.Today;
                }
                context.SaveChanges();
                var payment = context.Payments.Where(c => c.Registration.Id == registrationId).Include(c => c.Registration).FirstOrDefault();

                var mentorAmount = coursePrice - ((coursePrice * techCommission) / 100); //amount to mentor
                var amount = (mentorAmount * 25) / 100;//25% of mentorAmount

                //var amount = payment.BalanceAmount;
                //var totalAmount = (amount / (100 - initialProgress)) * 100;
                payment.BalanceAmount -= (amount * (value - initialProgress) / 25);
                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<ApproveNotificationDto> ApproveMessages(string studentEmail)
        {
            var studentId = context.MoDUsers.SingleOrDefault(m => m.Email == studentEmail);
            var messages = context.Registrations.Where(t => t.StudentUser == studentId
            && t.IsApproved == true && t.PaymentDone == false).Select(c => new ApproveNotificationDto
            {
                RegistrationId = c.Id,
                Price = c.Course.Price,
                CourseName = c.Course.Name,
                MentorName = $"{c.Course.MentorUser.FirstName} {c.Course.MentorUser.LastName}",
                RequestDate = c.RegistrationDate,
                Slot = c.Course.SlotId == 1 ? "9:00 AM to 11:00 AM" : 
                (c.Course.SlotId == 2 ? "4:00 PM to 6:00 PM" : "7:00 PM to 9:00 PM")
            });
            return messages;
        }

        public IEnumerable<CompletedTrainingsDto> CompletedCourses(string studentEmail)
        {
            var studentId = context.MoDUsers.SingleOrDefault(m => m.Email == studentEmail);
            var trainings = context.Registrations.Where(t => t.StudentUser == studentId
            && t.IsApproved == true && t.Progress == 100).Select(c => new CompletedTrainingsDto
            {
                Id = c.Id,
                CourseName = c.Course.Name,
                Progress = c.Progress,
                Rating = c.Rating,
                RegistrationDate = c.RegistrationDate,
                UserName = $"{ c.Course.MentorUser.FirstName} {c.Course.MentorUser.LastName}",
                CompletionDate = c.CompletionDate
            });
            return trainings;
        }

        public IEnumerable<OngoingTrainingsDto> OngoingCourses(string studentEmail)
        {
            var studentId = context.MoDUsers.SingleOrDefault(m => m.Email == studentEmail);
            var trainings = context.Registrations.Where(t => t.StudentUser == studentId
            && t.IsApproved == true && t.Progress < 100).Select(c => new OngoingTrainingsDto
            {
                Id = c.Id,
                CourseName = c.Course.Name,
                Progress = c.Progress,
                Rating = c.Rating,
                RegistrationDate = c.RegistrationDate,
                UserName = $"{ c.Course.MentorUser.FirstName} {c.Course.MentorUser.LastName}"
            });
            return trainings;

        }

        public bool PaymentService(string studentEmail, PaymentDto paymentModel)
        {
            try
            {
               var registration =  context.Registrations.Where(r => r.Id == paymentModel.RegistrationId)
                     .Include(co => co.Course)
                     .ThenInclude(t => t.Technology)
                     .FirstOrDefault();

                var commission = Convert.ToInt32(registration.Course.Technology.Commission);
                var paidAmount = paymentModel.Price;
                var mentorDue = paidAmount - (paidAmount * commission) / 100;
                var payment = context.Payments.Add(new Payment
                {
                    Registration = registration,
                    BalanceAmount = mentorDue,
                    LastPaymentDate = System.DateTime.Today,
                });
                int result = context.SaveChanges();
                if (result <= 0)
                {
                    return false;
                }
                var reg = context.Registrations.Find(paymentModel.RegistrationId);
                reg.PaymentDone = true;
                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<RejectNotificationDto> RejectMessages(string studentEmail)
        {
            var studentId = context.MoDUsers.SingleOrDefault(m => m.Email == studentEmail);
            var messages = context.Registrations.Where(t => t.StudentUser == studentId
            && t.IsApproved == false && t.NotifyReject == true).Select(c => new RejectNotificationDto
            {
                CourseName = c.Course.Name,
                MentorName = $"{c.Course.MentorUser.FirstName} {c.Course.MentorUser.LastName}",
                RequestDate = c.RegistrationDate,
                Slot = c.Course.SlotId == 1 ? "9:00 AM to 11:00 AM" : (c.Course.SlotId == 2 ? "4:00 PM to 6:00 PM" : "7:00 PM to 9:00 PM"),
            }) ;
            return messages;
        }

        public bool RequestCourse(RequestCourseDto requestModel)
        {
            try
            {
                var student = context.MoDUsers.SingleOrDefault(c => c.Email == requestModel.StudentEmail);

                var studentId = student.Id;
                var model = new Registration
                {
                    Course = context.Courses.Find(requestModel.CourseId),
                    StudentUser = context.MoDUsers.Find(studentId),
                    Progress = 0,
                    IsApproved = false,
                    Rating = 0,
                    NotifyReject = false,
                    PaymentDone = false,
                    RegistrationDate = requestModel.RegDate
                };
                var result = context.Registrations.Add(model);
                if (result == null)
                {
                    return false;
                }
                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<SearchCoursesStudentDto> SearchCourses()
        {

            var courses = context.Courses.Select(c => new SearchCoursesStudentDto
            {
                Id = c.Id,
                CourseName = c.Name,
                Price = c.Price,
                Slot = c.SlotId == 1 ? "9:00 AM to 11:00 AM" : (c.SlotId == 2 ? "4:00 PM to 6:00 PM" : "7:00 PM to 9:00 PM"),
                Description = c.Description,
                MentorName = $"{c.MentorUser.FirstName} {c.MentorUser.LastName}",
                MentorRating = c.MentorUser.Rating
            });
            return courses;


        }

        public IEnumerable<PaymentHistoryDto> PaymentHistory(string studentEmail)
        {
            var studentId = context.MoDUsers.SingleOrDefault(m => m.Email == studentEmail);
            var result = context.Payments.Where(c => c.Registration.StudentUser == studentId &&
            c.Registration.IsApproved == true && c.Registration.PaymentDone == true).Select(t => new PaymentHistoryDto
            {
                Amount = t.Registration.Course.Price,
                CourseId = t.Registration.Course.Id,
                CourseName = t.Registration.Course.Name,
                PaymentDate = t.LastPaymentDate,
                PaymentId = t.Id,
                RegistrationId =t.Registration.Id
            });
            return result;
        }
    }
}
