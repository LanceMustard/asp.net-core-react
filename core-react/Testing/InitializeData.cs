using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.React.Models;

namespace Core.React.Testing
{
    static public class InitializeData
    {
        static public void BuildDataset(ApplicationContext context)
        {
            // Admin
            if (context.Users.Count() == 0) AddUsers(context);
            if (context.Roles.Count() == 0) AddRoles(context);
            if (context.Permissions.Count() == 0) AddPermissions(context);
            // Supplier portal
            if (context.Clients.Count() == 0) AddClients(context);
            if (context.Projects.Count() == 0) AddProjects(context);
            if (context.Suppliers.Count() == 0) AddSuppliers(context);
            if (context.Orders.Count() == 0) AddOrders(context);
            // Testing 
            if (context.Employees.Count() == 0) AddEmployees(context);
        }

        static private void AddUsers(ApplicationContext context)
        {
            for (int i = 0; i < 500; i++)
            {
                string role = "Admin";
                role = i % 2 == 0 ? "User" : role;
                role = i % 3 == 0 ? "Read Only" : role;
                context.Users.Add(
                    new User
                    {
                        Name = "Lance Mustard" + i.ToString(),
                        OSUser = "worleyparsons\\lance.mustard" + i.ToString(),
                        Email = "lance.mustard" + i.ToString() + "@worleyparsons.com",
                        Role = role
                    });
            }
            context.SaveChanges();
        }

        static private void AddRoles(ApplicationContext context)
        {
            context.Roles.Add(new Role
            {
                Name = "Admin",
            });
            context.Roles.Add(new Role
            {
                Name = "User",
            });
            context.Roles.Add(new Role
            {
                Name = "Read Only",
            });
            context.SaveChanges();
        }

        static private void AddPermissions(ApplicationContext context)
        {
            context.Permissions.Add(new Permission
            {
                Description = "Login",
                Group = "General"
            });
            context.Permissions.Add(new Permission
            {
                Description = "Create Suppliers",
                Group = "Suppliers"
            });
            context.Permissions.Add(new Permission
            {
                Description = "Update Suppliers",
                Group = "Suppliers"
            });
            context.Permissions.Add(new Permission
            {
                Description = "Delete Suppliers",
                Group = "Suppliers"
            });
            context.Permissions.Add(new Permission
            {
                Description = "View Suppliers",
                Group = "Suppliers"
            });
            context.SaveChanges();
        }

        static private void AddEmployees(ApplicationContext context)
        {
            context.Employees.Add(new Employee
            {
                Name = "Klay Thompson",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Kevon Looney",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Draymond Green",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Patrick McCaw",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Damian Jones",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Jordan Bell",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Stephen Curry",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Kevin Durant",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Andre Iguodala",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Shaun Livingston",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Nick Young",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Zaza Pachulia",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Omri Casspi",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "David West",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "JaVale McGee",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Quinn Cook",
                Gender = "Male"
            });
            context.Employees.Add(new Employee
            {
                Name = "Chris Boucher",
                Gender = "Male"
            });
            context.SaveChanges();
        }

        static private void AddSuppliers(ApplicationContext context)
        {
            context.Suppliers.Add(new Supplier
            {
                Name = "Blackwoods",
            });
            context.Suppliers.Add(new Supplier
            {
                Name = "Siemens",
            });
            context.SaveChanges();
        }

        static private void AddClients(ApplicationContext context)
        {
            context.Clients.Add(new Client
            {
                Name = "RIO Tinto",
            });
            context.Clients.Add(new Client
            {
                Name = "Woodside",
            });
            context.SaveChanges();
        }

        static private void AddProjects(ApplicationContext context)
        {
            Client rio = context.Clients.FirstOrDefault(x => x.Name == "RIO Tinto");
            Client wel = context.Clients.FirstOrDefault(x => x.Name == "Woodside");

            context.Projects.Add(new Project
            {
                Name = "Koodaideri",
                Client = rio
            });
            context.Projects.Add(new Project
            {
                Name = "KLE",
                Client = wel
            });
            context.Projects.Add(new Project
            {
                Name = "Pluto",
                Client = wel
            });
            context.SaveChanges();
        }

        static private void AddOrders(ApplicationContext context)
        {
            Project koodaideri = context.Projects.FirstOrDefault(x => x.Name == "Koodaideri");
            Project kle = context.Projects.FirstOrDefault(x => x.Name == "KLE");
            Supplier blackwoods = context.Suppliers.FirstOrDefault(x => x.Name == "Blackwoods");
            Supplier siemens = context.Suppliers.FirstOrDefault(x => x.Name == "Siemens");
            context.Orders.Add(new Order
            {
                Description = "Valves",
                Project = koodaideri,
                Supplier = blackwoods,
            });
            context.Orders.Add(new Order
            {
                Description = "Pumps",
                Project = koodaideri,
                Supplier = siemens,
            });
            context.Orders.Add(new Order
            {
                Description = "Motors",
                Project = kle,
                Supplier = blackwoods,
            });
            context.Orders.Add(new Order
            {
                Description = "Pipe Fabrication",
                Project = kle,
                Supplier = siemens,
            });
            context.SaveChanges();
        }
    }
}
