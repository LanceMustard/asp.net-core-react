using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.React.Models;

namespace Core.React.Data
{
    public class SupplierPortalContext : DbContext
    {
        public SupplierPortalContext(DbContextOptions<SupplierPortalContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Administration
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Role>().ToTable("Role");
            modelBuilder.Entity<Permission>().ToTable("Permission");
            // Project information
            modelBuilder.Entity<Client>().ToTable("Client");
            modelBuilder.Entity<Supplier>().ToTable("Supplier");
            modelBuilder.Entity<Project>().ToTable("Project");
            modelBuilder.Entity<ProjectUser>().ToTable("ProjectUser");
            modelBuilder.Entity<Order>().ToTable("Order");
            modelBuilder.Entity <OrderDataRequirement>().ToTable("OrderDataRequirement");
            // Reference library
            modelBuilder.Entity<Library>().ToTable("Library");
            modelBuilder.Entity<DocumentCode>().ToTable("DocumentCode");
            modelBuilder.Entity<PackageTemplate>().ToTable("PackageTemplate");
            modelBuilder.Entity<PackageTemplateItem>().ToTable("PackageTemplateItem");

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

            // Library has many Projects
            modelBuilder.Entity<Project>()
                .HasOne(p => p.Library)
                .WithMany(o => o.Projects)
                .HasForeignKey(p => p.LibraryId);

            // Client has many Projects
            modelBuilder.Entity<Project>()
                .HasOne(c => c.Client)
                .WithMany(p => p.Projects)
                .HasForeignKey(c => c.ClientId);

            // Reference Library has many Document Codes
            modelBuilder.Entity<DocumentCode>()
                .HasOne(d => d.Library)
                .WithMany(r => r.DocumentCodes)
                .HasForeignKey(d => d.LibraryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Reference Library has many Package Templates
            modelBuilder.Entity<PackageTemplate>()
                .HasOne(d => d.Library)
                .WithMany(r => r.PackageTemplates)
                .HasForeignKey(d => d.LibraryId)
                .OnDelete(DeleteBehavior.Restrict);

            // DocumentCode has many DocumentCodes
            modelBuilder.Entity<DocumentCode>()
                .HasMany(d => d.Children)
                .WithOne(d => d.Parent)
                .HasForeignKey(d => d.ParentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Package Template had many Items
            modelBuilder.Entity<PackageTemplateItem>()
                .HasOne(i => i.PackageTemplate)
                .WithMany(t => t.PackageTemplateItems)
                .HasForeignKey(i => i.PackageTemplateId);

            //Document Code can appear on many Package Template Items
            modelBuilder.Entity<PackageTemplateItem>()
                .HasOne(d => d.DocumentCode)
                .WithMany(t => t.PackageTemplateItems)
                .HasForeignKey(d => d.DocumentCodeId);

            // Project can have many project users
            modelBuilder.Entity<ProjectUser>()
                .HasOne(pu => pu.Project)
                .WithMany(p => p.ProjectUsers)
                .HasForeignKey(pu => pu.ProjectId);

            // User can have many project user
            modelBuilder.Entity<ProjectUser>()
                .HasOne(pu => pu.User)
                .WithMany(u => u.ProjectUsers)
                .HasForeignKey(pu => pu.UserId);

            // Role can have many project user
            modelBuilder.Entity<ProjectUser>()
                .HasOne(pu => pu.Role)
                .WithMany(r => r.ProjectUsers)
                .HasForeignKey(pu => pu.RoleId);

            // Order can have many order data requirements
            modelBuilder.Entity<OrderDataRequirement>()
                .HasOne(dr => dr.Order)
                .WithMany(o => o.OrderDataRequirement)
                .HasForeignKey(dr => dr.OrderId);

            // Document code can have many order data requirements
            modelBuilder.Entity<OrderDataRequirement>()
                .HasOne(dr => dr.DocumentCode)
                .WithMany(dc => dc.OrderDataRequirement)
                .HasForeignKey(dr => dr.DocumentCodeId);
        }

        // Admin
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Core.React.Models.RolePermission> RolePermission { get; set; }

        // Supplier Portal
        public DbSet<Library> Libraries { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectUser> ProjectUsers { get; set; }

        public DbSet<DocumentCode> DocumentCodes { get; set; }
        public DbSet<PackageTemplate> PackageTemplates { get; set; }
        public DbSet<PackageTemplateItem> PackageTemplateItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDataRequirement> OrderDataRequirements { get; set; }
    }
}
