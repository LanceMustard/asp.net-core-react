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
    [Route("api/DocumentCodes")]
    public class DocumentCodesController : Controller
    {
        private readonly ApplicationContext _context;

        public DocumentCodesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/DocumentCodes
        [HttpGet]
        public IEnumerable<DocumentCode> GetDocumentCodes()
        {
            //IEnumerable<DocumentCode> data = _context.DocumentCodes
            //       .Include(x => x.Children)
            //       .AsEnumerable()
            //       .Where(x => x.Parent == null)
            //       .ToList();
            //return data;
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

    //[Produces("application/json")]
    //[Route("api/DocumentCodeChildren")]
    //public class DocumentCodeChildrenController : Controller
    //{
    //    private readonly ApplicationContext _context;

    //    public DocumentCodeChildrenController(ApplicationContext context)
    //    {
    //        _context = context;
    //    }

    //    // GET: api/DocumentCodeChildren/5
    //    [HttpGet("{id}")]
    //    public List<DocumentCode> GetDocumentCodeChildren([FromRoute] int id)
    //    {
    //        List<DocumentCode> documentCodes = (from o in _context.DocumentCodes where o.ParentId == id select o).ToList();
    //        return documentCodes;
    //    }
    //}

    }