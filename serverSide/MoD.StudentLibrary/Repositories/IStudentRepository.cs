using MoD.DtoLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.StudentLibrary
{ 
    public interface IStudentRepository
    {
        IEnumerable<SearchCoursesStudentDto> SearchCourses();
        bool RequestCourse(RequestCourseDto requestModel);
        IEnumerable<OngoingTrainingsDto> OngoingCourses(string studentEmail);
        IEnumerable<CompletedTrainingsDto> CompletedCourses(string studentEmail);
        IEnumerable<RejectNotificationDto> RejectMessages(string studentEmail);
        IEnumerable<ApproveNotificationDto> ApproveMessages(string studentEmail);
        bool PaymentService(string studentEmail, PaymentDto paymentModel);
        bool AddRating(int registrationId, int value);
        bool AddProgress(int registrationId, int value);
        IEnumerable<PaymentHistoryDto> PaymentHistory(string studentEmail);
    }
}
