using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.React.Models;

namespace Core.React.Testing
{
    static public class InitializeData
    { 
        static private string[] orders = new string[] { "Valves", "Pumps", "Motors", "Pipe Fabrication", "Bolts", "Gaskets", "Structural Steel", "HDPE", "Junction Boxs", "HVAC", "Gas Turbine", "Heat Exchanger" };
        static private string[] suppliers = new string[] { "Blackwoods", "Siemens", "Camerons", "AGC", "All Pumps", "UGL", "Kelair", "Grundfos", "Allied" };
        static private string[] projects = new string[] { "Domgas", "KLE", "Koodaideri", "Yarnima", "KJV Train 4", "Basgas", "Napa Napa", "Lakshmi", "Sawan", "Pluto gas", "Ravensthorne Nickle", "Boddington Gold Mine" };
        static private string[] clients = new string[] { "Woodside", "Chevron", "RIO Tinto", "BHP" };
        static private string[] engineers = new string[] { "Klay Thompson", "Kevon Looney", "Draymond Green", "Patrick McCaw", "Damian Jones", "Jordan Bell", "Stephen Curry", "Kevin Durant", "Andre Iguodala", "Shaun Livingston", "Nick Young", "Zaza Pachulia", "Omri Casspi", "David West", "JaVale McGee", "Quinn Cook", "Chris Boucher" };
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
            foreach (string supplier in suppliers)
            {
                context.Suppliers.Add(new Supplier { Name = supplier });
            }
            context.SaveChanges();
        }

        static private void AddClients(ApplicationContext context)
        {
            foreach (string client in clients)
            {
                context.Clients.Add(new Client { Name = client });
            }
            context.SaveChanges();
        }

        static private void AddProjects(ApplicationContext context)
        {
            Random rnd = new Random();
            foreach (string project in projects)
            {
                int i = rnd.Next(0, clients.Length);
                Client client = context.Clients.FirstOrDefault(x => x.Name == clients[i]);
                context.Projects.Add(new Project
                {
                    Name = project,
                    Client = client
                });
            }
            context.SaveChanges();
        }

        static private void AddOrders(ApplicationContext context)
        {
            Random rnd = new Random();
            foreach (string order in orders)
            {
                int i = rnd.Next(0, suppliers.Length);
                Supplier supplier = context.Suppliers.FirstOrDefault(x => x.Name == suppliers[i]);
                i = rnd.Next(0, projects.Length);
                Project project = context.Projects.FirstOrDefault(x => x.Name == projects[i]);
                context.Orders.Add(new Order
                {
                    Number = "PO-" + rnd.Next(0, 1000).ToString().PadLeft(6, '0'),
                    Description = order,
                    RequisitionNumber = "REQ" + rnd.Next(0, 1000).ToString().PadLeft(6, '0'),
                    ResponsibleEngineer = engineers[rnd.Next(0, engineers.Length - 1)],
                    AwardDate = DateTime.Now.AddDays(rnd.Next(0, 30)),
                    Project = project,
                    Supplier = supplier
                });
            }
            context.SaveChanges();
        }
    }
}
