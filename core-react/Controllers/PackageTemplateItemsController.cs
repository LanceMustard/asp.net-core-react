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
    [Route("api/PackageTemplateItems")]
    public class PackageTemplateItemsController : Controller
    {
        private readonly SupplierPortalContext _context;

        public PackageTemplateItemsController(SupplierPortalContext context)
        {
            _context = context;
        }

        // GET: api/PackageTemplateItems
        [HttpGet]
        public IEnumerable<PackageTemplateItem> GetPackageTemplateDocumentCodes()
        {
            return _context.PackageTemplateItems;
        }

        // GET: api/PackageTemplateItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPackageTemplateItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packageTemplateItem = await _context.PackageTemplateItems.SingleOrDefaultAsync(m => m.Id == id);

            if (packageTemplateItem == null)
            {
                return NotFound();
            }

            return Ok(packageTemplateItem);
        }

        // PUT: api/PackageTemplateItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPackageTemplateItem([FromRoute] int id, [FromBody] PackageTemplateItem packageTemplateItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != packageTemplateItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(packageTemplateItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackageTemplateItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PackageTemplateItems
        [HttpPost]
        public async Task<IActionResult> PostPackageTemplateItem([FromBody] PackageTemplateItem packageTemplateItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PackageTemplateItems.Add(packageTemplateItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPackageTemplateItem", new { id = packageTemplateItem.Id }, packageTemplateItem);
        }

        // DELETE: api/PackageTemplateItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackageTemplateItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packageTemplateItem = await _context.PackageTemplateItems.SingleOrDefaultAsync(m => m.Id == id);
            if (packageTemplateItem == null)
            {
                return NotFound();
            }

            _context.PackageTemplateItems.Remove(packageTemplateItem);
            await _context.SaveChangesAsync();

            return Ok(packageTemplateItem);
        }

        private bool PackageTemplateItemExists(int id)
        {
            return _context.PackageTemplateItems.Any(e => e.Id == id);
        }
    }
}