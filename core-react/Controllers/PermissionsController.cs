using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Core.React.Data;
using Core.React.Models;
//using Core.React.Testing;

namespace core_react.Controllers
{
    [EnableCors("CustomCORS")]
    [Produces("application/json")]
    [Route("api/Permissions")]
    public class PermissionsController : Controller
    {
        private readonly SupplierPortalContext _context;

        public PermissionsController(SupplierPortalContext context)
        {
            _context = context;
            //InitializeData.BuildDataset(context);
        }

        // GET: api/Permissions
        [HttpGet]
        public IEnumerable<Permission> GetPermissions()
        {
            return _context.Permissions;
        }

        // GET: api/Permissions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPermission([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var permission = await _context.Permissions.SingleOrDefaultAsync(m => m.Id == id);

            if (permission == null)
            {
                return NotFound();
            }

            return Ok(permission);
        }

        // PUT: api/Permissions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPermission([FromRoute] int id, [FromBody] Permission permission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != permission.Id)
            {
                return BadRequest();
            }

            _context.Entry(permission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PermissionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(permission);
        }

        // POST: api/Permissions
        [HttpPost]
        public async Task<IActionResult> PostPermission([FromBody] Permission permission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Permissions.Add(permission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPermission", new { id = permission.Id }, permission);
        }

        // DELETE: api/Permissions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePermission([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var permission = await _context.Permissions.SingleOrDefaultAsync(m => m.Id == id);
            if (permission == null)
            {
                return NotFound();
            }

            _context.Permissions.Remove(permission);
            await _context.SaveChangesAsync();

            return Ok(permission);
        }

        private bool PermissionExists(int id)
        {
            return _context.Permissions.Any(e => e.Id == id);
        }
    }
}