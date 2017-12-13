﻿using System;
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

        // Admin
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Core.React.Models.RolePermission> RolePermission { get; set; }

        // Testing 
        public DbSet<Employee> Employees { get; set; }

        // Supplier Portal
        public DbSet<Client> Clients { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<DocumentCode> DocumentCodes { get; set; }
        public DbSet<Core.React.Models.PackageTemplate> PackageTemplate { get; set; }
        public DbSet<Core.React.Models.PackageTemplateDocumentCode> PackageTemplateDocumentCodes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Supplier has many Orders
            modelBuilder.Entity<Order>()
                .HasOne(s => s.Supplier)
                .WithMany(o => o.Orders)
                .HasForeignKey(s => s.SupplierId);

            // Project has many Orders
            modelBuilder.Entity<Order>()
                .HasOne(p => p.Project)
                .WithMany(o => o.Orders)
                .HasForeignKey(p => p.ProjectId);

            // Client has many Projects
            modelBuilder.Entity<Project>()
                .HasOne(c => c.Client)
                .WithMany(p => p.Projects)
                .HasForeignKey(c => c.ClientId);

            // DocumentCode has many DocumentCodes
            //modelBuilder.Entity<DocumentCode>()
            //    .HasMany(d => d.Children)
            //    .WithOne(d => d.Parent)
            //    .HasForeignKey(d => d.ParentId);

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
