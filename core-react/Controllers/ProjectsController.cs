using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.React.Models;
using Core.React.Testing;

namespace core_react.Controllers
{
    [Produces("application/json")]
    [Route("api/Projects")]
    public class ProjectsController : Controller
    {
        private readonly ApplicationContext _context;

        public ProjectsController(ApplicationContext context)
        {
            _context = context;
            InitializeData.BuildDataset(context);
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
        private readonly ApplicationContext _context;

        public ProjectOrdersController(ApplicationContext context)
        {
            _context = context;
            InitializeData.BuildDataset(context);
        }

        // GET: api/Project/Orders
        [HttpGet("{id}")]
        public List<Order> GetOrders([FromRoute] int id)
        {
            List<Order> orders = (from o in _context.Orders where o.ProjectId == id select o).ToList();
            return orders;
        }
    }

    [Route("api/Project/Users")]
    [Produces("application/json")]
    public class ProjectUsersController : Controller
    {
        private readonly ApplicationContext _context;

        public ProjectUsersController(ApplicationContext context)
        {
            _context = context;
            InitializeData.BuildDataset(context);
        }

        // GET: api/Project/Users
        [HttpGet("{id}")]
        public List<User> GetUsers([FromRoute] int id)
        {
            List<User> users = (from o in _context.Users select o).ToList();
            return users;
        }
    }

}