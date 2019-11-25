using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MoD.AdminLibrary;
using MoD.SharedLibrary.Models;

namespace MoD.AdminService
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminController : ControllerBase
    {
        IAdminRepository repository;
        public AdminController(IAdminRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/Admin
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(repository.GetTechnologies());
        }

        //// GET: api/Admin/5
        //[HttpGet("{id}", Name = "GetTechnology")]
        //public IActionResult Get(int id)
        //{
        //    var technology = repository.GetTechnology(id);
        //    if (technology == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(technology);
        //}

    
        // POST: api/Admin
        [HttpPost]
        public IActionResult Post([FromBody] Technology model)
        {
            if (ModelState.IsValid)
            {
                bool result = repository.AddTechnology(model);
                if (result)
                {
                    return Created("AddTechnology", model.Id);
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/Admin/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Technology model)
        {
            if (ModelState.IsValid && id == model.Id)
            {
                bool result = repository.UpdateTechnology(model);
                if (result)
                {
                    return Ok("Update Success");
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return BadRequest(ModelState);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("users/{role}")]
        public IActionResult GetUsers(string role)
        {
            
            var result = repository.GetUsers(role);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("userAccess/{id}")]
        public IActionResult ModifyUserAccess(string id)
        {

            bool result = repository.ModifyUserAccess(id);
            if (result)
            {
                return Ok("User access modified");
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

    }
}
