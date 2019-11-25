using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoD.MentorLibrary;

namespace MentorOnDemand_WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MentorController : ControllerBase
    {
        IMentorRepository repository;
        public MentorController(IMentorRepository repository)
        {
            this.repository = repository;
        }

        //// GET: api/Mentor
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/mentor/ListTechnologies
        [HttpGet("listTech")]
        public IActionResult ListTech()
        {
            return Ok(repository.ListTechnologies());
        }

        //// GET: api/Mentor/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        [HttpGet("myCourses/{mentorEmail}")]
        public IActionResult ListCourses(string mentorEmail)
        {
            var result = repository.ListCourses(mentorEmail);
            return Ok(result);
        }

        //GET: api/mentor/mentorNotifications
        [HttpGet("mentorNotifications/{mentorEmail}")]
        public IActionResult GetMessages(string mentorEmail)
        {
            var result = repository.GetMessages(mentorEmail);
            return Ok(result);
        }

        //GET: api/mentor/ongoingTrainings
        [HttpGet("ongoingTrainings/{mentorEmail}")]
        public IActionResult OngoingTrainings(string mentorEmail)
        {
            var result = repository.OngoingTrainings(mentorEmail);
            return Ok(result);
        }

        //GET: api/mentor/completedTrainings
        [HttpGet("completedTrainings/{mentorEmail}")]
        public IActionResult CompletedTrainings(string mentorEmail)
        {
            var result = repository.CompletedTrainings(mentorEmail);
            return Ok(result);
        }

        //GET: api/mentor/paymentHistory
        [HttpGet("paymentHistory/{mentorEmail}")]
        public IActionResult PaymentHistory(string mentorEmail)
        {
            var result = repository.PaymentHistory(mentorEmail);
            return Ok(result);
        }

        //PUT:api/mentor/courseRequestUpdate
        [HttpPut("courseRequestUpdate/{id}")]
        public IActionResult CourseRequestUpdate(int id, [FromBody] bool isApproved)
        {
            var result = repository.CourseRequestUpdate(id, isApproved);
            if (result)
            {
                return Ok("Course request approved");
            }
            return Ok("Course request rejected, User will be notified");
        }

        //// POST: api/Mentor
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // POST: api/mentor/createCourse/
        [HttpPost("createCourse")]
        public IActionResult Post([FromBody] CreateCourseDto model )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid input");
            }
            var result = repository.CreateCourse(model);
            if (result)
            {
                return Ok("Course created successfully");
            }
            return StatusCode(StatusCodes.Status500InternalServerError);

            
        }

        // PUT: api/Mentor/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
