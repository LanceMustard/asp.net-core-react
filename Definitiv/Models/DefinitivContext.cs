using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Definitiv.Models;

namespace Definitiv.Models
{
    public class DefinitivContext : DbContext
    {
        public DefinitivContext(DbContextOptions<DefinitivContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

    }
}
