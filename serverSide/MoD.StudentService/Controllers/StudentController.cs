using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoD.StudentLibrary;

namespace MoD.StudentService
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        IStudentRepository repository;
        public StudentController(IStudentRepository repository)
        {
            this.repository = repository;
        }
        // GET: api/Student
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/student/searchCourses
        [HttpGet("searchCourses")]
        public IActionResult SearchCourses()
        {
            return Ok(repository.SearchCourses());
        }

        //GET: api/student/ongoingCourses
        [HttpGet("ongoingCourses/{studentEmail}")]
        public IActionResult OngoingCourses(string studentEmail)
        {
            var result = repository.OngoingCourses(studentEmail);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        //GET: api/student/completedCourses
        [HttpGet("completedCourses/{studentEmail}")]
        public IActionResult CompletedCourses(string studentEmail)
        {
            var result = repository.CompletedCourses(studentEmail);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        //GET: api/student/rejected
        [HttpGet("rejected/{studentEmail}")]
        public IActionResult RejectMessages(string studentEmail)
        {
            var result = repository.RejectMessages(studentEmail);
            return Ok(result);
        }

        //GET: api/student/approved
        [HttpGet("approved/{studentEmail}")]
        public IActionResult ApproveMessages(string studentEmail)
        {
            var result = repository.ApproveMessages(studentEmail);
            return Ok(result);
        }

        //GET: api/student/paymentHistory
        [HttpGet("paymentHistory/{studentEmail}")]
        public IActionResult PaymentHistory(string studentEmail)
        {
            var result = repository.PaymentHistory(studentEmail);
            return Ok(result);
        }

        [HttpPost("requestCourse")]
        public IActionResult RequestCourse(RequestCourseDto requestModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = repository.RequestCourse(requestModel);
            if (result)
            {
                return Ok("Success");
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }


        [HttpPut("paymentService/{studentEmail}")]
        public IActionResult PaymentService(string studentEmail, [FromBody] PaymentDto paymentModel)
        {
           
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = repository.PaymentService(studentEmail, paymentModel);
            if (result)
            {
                return Ok(result);
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        //PUT: api/rating/regid
        [HttpPut("rating/{registrationId}")]
        public IActionResult addRating(int registrationId,[FromBody] int value)
        {
            var result = repository.AddRating(registrationId, value);
            return Ok(result);

        }
        //PUT: api/progress/regid
        [HttpPut("progress/{registrationId}")]
        public IActionResult addProgress(int registrationId, [FromBody] int value)
        {
            var result = repository.AddProgress(registrationId, value);
            return Ok(result);

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
