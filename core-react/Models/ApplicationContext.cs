using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.React.Models;

namespace Core.React.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasOne(s => s.Supplier)
                .WithMany(o => o.Orders)
                .HasForeignKey(s => s.SupplierId);

            modelBuilder.Entity<Order>()
                .HasOne(p => p.Project)
                .WithMany(o => o.Orders)
                .HasForeignKey(p => p.ProjectId);

            //    modelBuilder.Entity<Employee>().ToTable("Employee");
            //    modelBuilder.Entity<User>().ToTable("User");
            //    modelBuilder.Entity<Supplier>().ToTable("Supplier");
            //    modelBuilder.Entity<Order>().ToTable("Order");
            //    modelBuilder.Entity<Project>().ToTable("Project");

            //    modelBuilder.Entity<Supplier>()
            //        .HasMany(p => p.Orders)
            //        .Map(m => m.MapKey(p => p.Id, "SupplierId"));

            //    modelBuilder.Entity<Project>()
            //        .HasMany(p => p.Orders)
            //        .Map(m => m.MapKey(p => p.Id, "ProjectId"));
        }
    }
}
