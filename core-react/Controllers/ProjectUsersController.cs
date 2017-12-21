using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.React.Data;
using Core.React.Models;

namespace core_react.Controllers
{
    [Produces("application/json")]
    [Route("api/ProjectUsers")]
    public class ProjectUsersController : Controller
    {
        private readonly SupplierPortalContext _context;

        public ProjectUsersController(SupplierPortalContext context)
        {
            _context = context;
        }

        // GET: api/ProjectUsers
        [HttpGet("{id}")]
        public IEnumerable<ProjectUser> GetProjectUsers([FromRoute] int id)
        {
            return (from user in _context.ProjectUsers
                    where user.ProjectId == id
                    select user)
                    .Include(u => u.User)
                    .Include(p => p.Project)
                    .Include(r => r.Role)
                    .ToList();
        }

        // GET: api/ProjectUsers/5
        //[HttpGet("{id}")]
        public async Task<IActionResult> GetProjectUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var projectUser = await _context.ProjectUsers.SingleOrDefaultAsync(m => m.Id == id);

            if (projectUser == null)
            {
                return NotFound();
            }

            projectUser.Project = _context.Projects.FirstOrDefault(x => x.Id == projectUser.ProjectId);
            projectUser.User = _context.Users.FirstOrDefault(x => x.Id == projectUser.UserId);
            projectUser.Role = _context.Roles.FirstOrDefault(x => x.Id == projectUser.RoleId);

            return Ok(projectUser);
        }

        // PUT: api/ProjectUsers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectUser([FromRoute] int id, [FromBody] ProjectUser projectUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != projectUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(projectUser);
        }

        // POST: api/ProjectUsers
        [HttpPost]
        public async Task<IActionResult> PostProjectUser([FromBody] ProjectUser projectUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ProjectUsers.Add(projectUser);
            await _context.SaveChangesAsync();

            projectUser.Project = _context.Projects.FirstOrDefault(x => x.Id == projectUser.ProjectId);
            projectUser.User = _context.Users.FirstOrDefault(x => x.Id == projectUser.UserId);
            projectUser.Role = _context.Roles.FirstOrDefault(x => x.Id == projectUser.RoleId);

            return Ok(projectUser);
       }

        // DELETE: api/ProjectUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var projectUser = await _context.ProjectUsers.SingleOrDefaultAsync(m => m.Id == id);
            if (projectUser == null)
            {
                return NotFound();
            }

            _context.ProjectUsers.Remove(projectUser);
            await _context.SaveChangesAsync();

            return Ok(projectUser);
        }

        private bool ProjectUserExists(int id)
        {
            return _context.ProjectUsers.Any(e => e.Id == id);
        }
    }
}