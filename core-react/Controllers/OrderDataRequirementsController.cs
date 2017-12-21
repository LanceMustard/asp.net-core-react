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
    [Route("api/OrderDataRequirements")]
    public class OrderDataRequirementsController : Controller
    {
        private readonly SupplierPortalContext _context;

        public OrderDataRequirementsController(SupplierPortalContext context)
        {
            _context = context;
        }

        // GET: api/OrderDataRequirements
        [HttpGet]
        public IEnumerable<OrderDataRequirement> GetOrderDataRequirements()
        {
            return _context.OrderDataRequirements;
        }

        // GET: api/OrderDataRequirements/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDataRequirement([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var orderDataRequirement = await _context.OrderDataRequirements.SingleOrDefaultAsync(m => m.OrderId == id);
            var orderDataRequirement =  
                (from data in _context.OrderDataRequirements 
                where data.OrderId == id
                select data)
                .Include(o => o.Order)
                .Include(d => d.DocumentCode)
                .ToList();

            if (orderDataRequirement == null)
            {
                return NotFound();
            }

            return Ok(orderDataRequirement);
        }

        // PUT: api/OrderDataRequirements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderDataRequirement([FromRoute] int id, [FromBody] OrderDataRequirement orderDataRequirement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderDataRequirement.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderDataRequirement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDataRequirementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(orderDataRequirement);
        }

        // POST: api/OrderDataRequirements
        [HttpPost]
        public async Task<IActionResult> PostOrderDataRequirement([FromBody] OrderDataRequirement orderDataRequirement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.OrderDataRequirements.Add(orderDataRequirement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderDataRequirement", new { id = orderDataRequirement.Id }, orderDataRequirement);
        }

        // DELETE: api/OrderDataRequirements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDataRequirement([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orderDataRequirement = await _context.OrderDataRequirements.SingleOrDefaultAsync(m => m.Id == id);
            if (orderDataRequirement == null)
            {
                return NotFound();
            }

            _context.OrderDataRequirements.Remove(orderDataRequirement);
            await _context.SaveChangesAsync();

            return Ok(orderDataRequirement);
        }

        private bool OrderDataRequirementExists(int id)
        {
            return _context.OrderDataRequirements.Any(e => e.Id == id);
        }
    }
}