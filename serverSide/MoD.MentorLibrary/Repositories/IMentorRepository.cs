using MoD.DtoLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.MentorLibrary
{
    public interface IMentorRepository
    {
        IEnumerable<ListTechnologiesDto> ListTechnologies();
        bool CreateCourse(CreateCourseDto model);
        IEnumerable<ListCoursesDto> ListCourses(string mentorEmail);
        IEnumerable<MentorNotificationDto> GetMessages(string mentorEmail);
        bool CourseRequestUpdate(int id, bool isApproved);
        IEnumerable<OngoingTrainingsDto> OngoingTrainings(string mentorEmail);
        IEnumerable<CompletedTrainingsDto> CompletedTrainings(string mentorEmail);
        IEnumerable<PaymentHistoryDto> PaymentHistory(string mentorEmail);
    }
}
