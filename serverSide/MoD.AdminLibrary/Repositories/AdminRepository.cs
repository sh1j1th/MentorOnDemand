using MoD.SharedLibrary;
using MoD.SharedLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoD.AdminLibrary
{
    public class AdminRepository : IAdminRepository
   {
        AdminContext context;

        //register dependency in config services
        public AdminRepository(AdminContext context)
        {
                this.context = context;
        } 

        public bool AddTechnology(Technology model)
        {
            try
            {
                context.Technologies.Add(model);
                int result = context.SaveChanges();
                if (result > 0)
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public IEnumerable<Technology> GetTechnologies()
        {
            return context.Technologies.ToList();
        }

        public Technology GetTechnology(int id)
        {
            return context.Technologies.Find(id);
        }

        
        public bool UpdateTechnology(Technology model)
        {
            try
            {
                context.Technologies.Update(model);
                int result = context.SaveChanges();
                if (result > 0) //result>0 since result has no.of records updated
                {
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<UserDto> GetUsers(string role)
        {
            var users = from m in context.MoDUsers
                         join ma in context.UserRoles on m.Id equals ma.UserId
                         where ma.RoleId == role
                         select m;
            var result = users.Select(u => new UserDto
            {
                Id = u.Id,
                Name = $"{u.FirstName} {u.LastName}",
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                UserName = u.UserName,
                IsEnabled = u.IsEnabled
            });
            return result;
        }

        public bool ModifyUserAccess(string id)
        {
            var user = context.MoDUsers.Find(id);
            if (user == null)
            {
                return false;
            }
            user.IsEnabled = !user.IsEnabled;
            context.SaveChanges();
            return true;

        }
    }
}
