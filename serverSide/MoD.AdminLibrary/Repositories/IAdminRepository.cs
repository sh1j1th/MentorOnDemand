using MoD.SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.AdminLibrary
{
    public interface IAdminRepository
    {
        bool AddTechnology(Technology model);
        IEnumerable<Technology> GetTechnologies();
        Technology GetTechnology(int id);
        bool UpdateTechnology(Technology model);
        IEnumerable<UserDto> GetUsers(string role);
        bool ModifyUserAccess(string id);
    }
} 
