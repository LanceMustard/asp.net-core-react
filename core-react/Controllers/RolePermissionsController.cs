using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.React.Models;

namespace core_react.Controllers
{
    [Produces("application/json")]
    [Route("api/RolePermissions")]
    public class RolePermissionsController : Controller
    {
        private readonly ApplicationContext _context;

        public RolePermissionsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/RolePermissions
        [HttpGet]
        public IEnumerable<RolePermission> GetRolePermission()
        {
            return _context.RolePermission;
        }

        // GET: api/RolePermissions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRolePermission([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rolePermission = await _context.RolePermission.SingleOrDefaultAsync(m => m.Id == id);

            if (rolePermission == null)
            {
                return NotFound();
            }

            return Ok(rolePermission);
        }

        // PUT: api/RolePermissions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRolePermission([FromRoute] int id, [FromBody] RolePermission rolePermission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rolePermission.Id)
            {
                return BadRequest();
            }

            _context.Entry(rolePermission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolePermissionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(rolePermission);
        }

        // POST: api/RolePermissions
        [HttpPost]
        public async Task<IActionResult> PostRolePermission([FromBody] RolePermission rolePermission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.RolePermission.Add(rolePermission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRolePermission", new { id = rolePermission.Id }, rolePermission);
        }

        // DELETE: api/RolePermissions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRolePermission([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rolePermission = await _context.RolePermission.SingleOrDefaultAsync(m => m.Id == id);
            if (rolePermission == null)
            {
                return NotFound();
            }

            _context.RolePermission.Remove(rolePermission);
            await _context.SaveChangesAsync();

            return Ok(rolePermission);
        }

        private bool RolePermissionExists(int id)
        {
            return _context.RolePermission.Any(e => e.Id == id);
        }
    }
}