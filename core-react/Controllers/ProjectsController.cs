using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.React.Data;
using Core.React.Models;
//using Core.React.Testing;

namespace core_react.Controllers
{
    [Produces("application/json")]
    [Route("api/Projects")]
    public class ProjectsController : Controller
    {
        private readonly SupplierPortalContext _context;

        public ProjectsController(SupplierPortalContext context)
        {
            _context = context;
            //InitializeData.BuildDataset(context);
        }

        // GET: api/Projects
        [HttpGet]
        public IEnumerable<Project> GetProjects()
        {
            return _context.Projects;
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = await _context.Projects.SingleOrDefaultAsync(p => p.Id == id);
            //var project = await _context.Projects
            //    .Include(o => o.Orders)
            //    .Where(p => p.Id == id)
            //    .ToListAsync();

            if (project == null)
            {
                return NotFound();
            }

            // crude way of doing this
            //project.Client = _context.Clients.FirstOrDefault(c => c.Id == project.ClientId);

            return Ok(project);
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject([FromRoute] int id, [FromBody] Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != project.Id)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(project);
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<IActionResult> PostProject([FromBody] Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = await _context.Projects.SingleOrDefaultAsync(m => m.Id == id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Ok(project);
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
    }

    [Route("api/Project/Orders")]
    [Produces("application/json")]
    public class ProjectOrdersController : Controller
    {
        private readonly SupplierPortalContext _context;

        public ProjectOrdersController(SupplierPortalContext context)
        {
            _context = context;
        }

        // GET: api/Project/Orders
        [HttpGet("{id}")]
        public List<Order> GetOrders([FromRoute] int id)
        {
            List<Order> orders = (from o in _context.Orders where o.ProjectId == id select o).ToList();
            return orders;
        }
    }

    //[Route("api/Project/Users")]
    //[Produces("application/json")]
    //public class ProjectUsersController : Controller
    //{
    //    private readonly SupplierPortalContext _context;

    //    public ProjectUsersController(SupplierPortalContext context)
    //    {
    //        _context = context;
    //    }

    //    // GET: api/Project/Users
    //    [HttpGet("{id}")]
    //    public List<ProjectUser> GetUsers([FromRoute] int id)
    //    {
    //        List<ProjectUser> users = (from u in _context.ProjectUsers where u.ProjectId == id select u)
    //            .Include(u => u.Project)
    //            .Include(u => u.Role)
    //            .Include(u => u.User)
    //            .ToList();
    //        return users;
    //    }

    //    // POST: api/Project/Users/5
    //    [HttpPost("{id}")]
    //    public async Task<IActionResult> PostProjectUsers([FromRoute] int id, [FromBody] string[] users)
    //    {
    //        Project project = _context.Projects.FirstOrDefault(x => x.Id == id);
    //        // remove deleted users from project
    //        List<ProjectUser> existingProjectUsers = (from pu in _context.ProjectUsers where pu.ProjectId == id select pu).ToList();
    //        foreach (ProjectUser projectUser in existingProjectUsers)
    //        {
    //            string userId = users.FirstOrDefault(x => x == projectUser.UserId.ToString());
    //            if (string.IsNullOrEmpty(userId))
    //            {
    //                // existing user can not be found in new user collection, so delete it
    //                _context.ProjectUsers.Remove(projectUser);
    //            }
    //        }
    //        // add users to project
    //        Role role = _context.Roles.FirstOrDefault(x => x.Id == project.DefaultRoleId);
    //        List<ProjectUser> projectUsers = new List<ProjectUser>();
    //        foreach (string userId in users)
    //        {
    //            ProjectUser user = _context.ProjectUsers.FirstOrDefault(x => x.UserId.ToString() == userId);
    //            if (user == null)
    //            {
    //                user = new ProjectUser
    //                {
    //                    Project = project,
    //                    User = _context.Users.FirstOrDefault(x => x.Id.ToString() == userId),
    //                    Role = role
    //                };
    //            }
    //            projectUsers.Add(user);
    //        }
    //        project.ProjectUsers = projectUsers;
    //        _context.Entry(project).State = EntityState.Modified;

    //        try
    //        {
    //            await _context.SaveChangesAsync();

    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {
    //            throw;
    //        }
    //        projectUsers = GetUsers(id);

    //        return Ok(projectUsers);
    //    }
    //}

}