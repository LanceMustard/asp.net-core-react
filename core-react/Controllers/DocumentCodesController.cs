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
    [Route("api/DocumentCodes")]
    public class DocumentCodesController : Controller
    {
        private readonly SupplierPortalContext _context;

        public DocumentCodesController(SupplierPortalContext context)
        {
            _context = context;
        }

        // GET: api/DocumentCodes
        [HttpGet]
        public IEnumerable<DocumentCode> GetDocumentCodes()
        {
            return _context.DocumentCodes;
        }

        // GET: api/DocumentCodes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDocumentCode([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var documentCode = await _context.DocumentCodes.SingleOrDefaultAsync(m => m.Id == id);

            if (documentCode == null)
            {
                return NotFound();
            }

            return Ok(documentCode);
        }

        // PUT: api/DocumentCodes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocumentCode([FromRoute] int id, [FromBody] DocumentCode documentCode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != documentCode.Id)
            {
                return BadRequest();
            }

            _context.Entry(documentCode).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentCodeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(documentCode);
        }

        // POST: api/DocumentCodes
        [HttpPost]
        public async Task<IActionResult> PostDocumentCode([FromBody] DocumentCode documentCode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DocumentCodes.Add(documentCode);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDocumentCode", new { id = documentCode.Id }, documentCode);
        }

        // DELETE: api/DocumentCodes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocumentCode([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var documentCode = await _context.DocumentCodes.SingleOrDefaultAsync(m => m.Id == id);
            if (documentCode == null)
            {
                return NotFound();
            }

            _context.DocumentCodes.Remove(documentCode);
            await _context.SaveChangesAsync();

            return Ok(documentCode);
        }

        private bool DocumentCodeExists(int id)
        {
            return _context.DocumentCodes.Any(e => e.Id == id);
        }
    }

    }