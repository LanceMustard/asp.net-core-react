using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Definitiv.Models;

namespace Definitiv.Controllers
{
    [EnableCors("OpenToAll")]
    [Produces("application/json")]
    [Route("api/Employees")]
    public class EmployeesController : Controller
    {
        private readonly DefinitivContext _context;

        public EmployeesController(DefinitivContext context)
        {
            _context = context;

            // as we are using an InMemory database, populate it with some dummy data
            if (_context.Employees.Count() == 0)
            {
                _context.Employees.Add(new Employee
                {
                    Name = "Klay Thompson",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Kevon Looney",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Draymond Green",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Patrick McCaw",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Damian Jones",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Jordan Bell",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Stephen Curry",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Kevin Durant",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Andre Iguodala",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Shaun Livingston",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Nick Young",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Zaza Pachulia",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Omri Casspi",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "David West",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "JaVale McGee",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Quinn Cook",
                    Gender = "Male"
                });
                _context.Employees.Add(new Employee
                {
                    Name = "Chris Boucher",
                    Gender = "Male"
                });
                _context.SaveChanges();
            }
        }

        // GET: api/Employees
        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            return _context.Employees;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employees.SingleOrDefaultAsync(m => m.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employee);
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<IActionResult> PostEmployee([FromBody] Employee employee)
        {
            // if no Id defind, auto assign to the current highest Id plus 1
            if (employee.Id == 0)
            {
                employee.Id = _context.Employees.OrderByDescending(x => x.Id).FirstOrDefault().Id + 1;
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employees.SingleOrDefaultAsync(m => m.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}