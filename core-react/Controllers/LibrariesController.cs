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
    [Route("api/Libraries")]
    public class LibrariesController : Controller
    {
        private readonly SupplierPortalContext _context;

        public LibrariesController(SupplierPortalContext context)
        {
            _context = context;
        }

        // GET: api/Libraries
        [HttpGet]
        public IEnumerable<Library> GetLibraries()
        {
            return _context.Libraries;
        }

        // GET: api/Libraries/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLibrary([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var library = await _context.Libraries.SingleOrDefaultAsync(m => m.Id == id);

            if (library == null)
            {
                return NotFound();
            }

            return Ok(library);
        }

        // PUT: api/Libraries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibrary([FromRoute] int id, [FromBody] Library library)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != library.Id)
            {
                return BadRequest();
            }

            _context.Entry(library).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibraryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(library);
        }

        // POST: api/Libraries
        [HttpPost]
        public async Task<IActionResult> PostLibrary([FromBody] Library library)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Libraries.Add(library);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLibrary", new { id = library.Id }, library);
        }

        // DELETE: api/Libraries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibrary([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var library = await _context.Libraries.SingleOrDefaultAsync(m => m.Id == id);
            if (library == null)
            {
                return NotFound();
            }

            _context.Libraries.Remove(library);
            await _context.SaveChangesAsync();

            return Ok(library);
        }

        private bool LibraryExists(int id)
        {
            return _context.Libraries.Any(e => e.Id == id);
        }
    }

    [Produces("application/json")]
    [Route("api/Library/DocumentCodes")]
    public class LibraryDocumentCodesController : Controller
    {
        private readonly SupplierPortalContext _context;

        public LibraryDocumentCodesController(SupplierPortalContext context)
        {
            _context = context;
        }

        // GET: api/Library/DocumentCodes
        [HttpGet("{id}")]
        public IEnumerable<DocumentCode> GetDocumentCodes(int id)
        {
            return (from x in _context.DocumentCodes where x.LibraryId == id select x).ToList();
        }
    }

    [Produces("application/json")]
    [Route("api/Library/PackageTemplates")]
    public class LibraryPackageTemplatesController : Controller
    {
        private readonly SupplierPortalContext _context;

        public LibraryPackageTemplatesController(SupplierPortalContext context)
        {
            _context = context;
        }

        // GET: api/Library/PackageTemplates
        [HttpGet("{id}")]
        public IEnumerable<PackageTemplate> GetPackageTemplates(int id)
        {
            return (from x in _context.PackageTemplates where x.LibraryId == id select x).ToList();
        }
    }

}