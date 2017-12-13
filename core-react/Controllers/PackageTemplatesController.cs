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
    [Route("api/PackageTemplates")]
    public class PackageTemplatesController : Controller
    {
        private readonly ApplicationContext _context;

        public PackageTemplatesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/PackageTemplates
        [HttpGet]
        public IEnumerable<PackageTemplate> GetPackageTemplate()
        {
            return _context.PackageTemplate;
        }

        // GET: api/PackageTemplates/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPackageTemplate([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packageTemplate = await _context.PackageTemplate.SingleOrDefaultAsync(m => m.Id == id);

            if (packageTemplate == null)
            {
                return NotFound();
            }

            return Ok(packageTemplate);
        }

        // PUT: api/PackageTemplates/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPackageTemplate([FromRoute] int id, [FromBody] PackageTemplate packageTemplate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != packageTemplate.Id)
            {
                return BadRequest();
            }

            _context.Entry(packageTemplate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackageTemplateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(packageTemplate);
        }

        // POST: api/PackageTemplates
        [HttpPost]
        public async Task<IActionResult> PostPackageTemplate([FromBody] PackageTemplate packageTemplate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PackageTemplate.Add(packageTemplate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPackageTemplate", new { id = packageTemplate.Id }, packageTemplate);
        }

        // DELETE: api/PackageTemplates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackageTemplate([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packageTemplate = await _context.PackageTemplate.SingleOrDefaultAsync(m => m.Id == id);
            if (packageTemplate == null)
            {
                return NotFound();
            }

            _context.PackageTemplate.Remove(packageTemplate);
            await _context.SaveChangesAsync();

            return Ok(packageTemplate);
        }

        private bool PackageTemplateExists(int id)
        {
            return _context.PackageTemplate.Any(e => e.Id == id);
        }
    }

    [Produces("application/json")]
    [Route("api/PackageTemplate/DocumentCodes")]
    public class PackageTemplatesDocumentCodesController : Controller
    {
        private readonly ApplicationContext _context;

        public PackageTemplatesDocumentCodesController(ApplicationContext context)
        {
            _context = context;
        }

         // GET: api/PackageTemplate/DocumentCodes/5
        [HttpGet("{id}")]
        public List<PackageTemplateDocumentCode> GetPackageTemplateDocumentCodes([FromRoute] int id)
        {
            List<PackageTemplateDocumentCode> packageTemplateDocumentCodes = (from p in _context.PackageTemplateDocumentCodes where p.PackageTemplateId == id select p).Include(x => x.DocumentCode).ToList();
            return packageTemplateDocumentCodes;
        }
    }
    }