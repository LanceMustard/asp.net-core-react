using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.React.Models;
using Core.React.Data;

namespace Core.React.Testing
{
    static public class InitializeData
    {
        //static private string[] orders = new string[] { "Valves", "Pumps", "Motors", "Pipe Fabrication", "Bolts", "Gaskets", "Structural Steel", "HDPE", "Junction Boxs", "HVAC", "Gas Turbine", "Heat Exchanger" };
        //static private string[] suppliers = new string[] { "Blackwoods", "Siemens", "Camerons", "AGC", "All Pumps", "UGL", "Kelair", "Grundfos", "Allied" };
        //static private string[] projects = new string[] { "Domgas", "KLE", "Koodaideri", "Yarnima", "KJV Train 4", "Basgas", "Napa Napa", "Lakshmi", "Sawan", "Pluto gas", "Ravensthorne Nickle", "Boddington Gold Mine" };
        //static private string[] clients = new string[] { "Woodside", "Chevron", "RIO Tinto", "BHP" };
        //static private string[] engineers = new string[] { "Klay Thompson", "Kevon Looney", "Draymond Green", "Patrick McCaw", "Damian Jones", "Jordan Bell", "Stephen Curry", "Kevin Durant", "Andre Iguodala", "Shaun Livingston", "Nick Young", "Zaza Pachulia", "Omri Casspi", "David West", "JaVale McGee", "Quinn Cook", "Chris Boucher" };
        //static public void BuildDataset(SupplierPortalContext context)
        //{
        //    // Admin
        //    if (context.Users.Count() == 0) AddUsers(context);
        //    if (context.Permissions.Count() == 0) AddPermissions(context);
        //    if (context.Roles.Count() == 0) AddRoles(context);
        //    // Supplier portal
        //    if (context.Clients.Count() == 0) AddClients(context);
        //    if (context.Projects.Count() == 0) AddProjects(context);
        //    if (context.Suppliers.Count() == 0) AddSuppliers(context);
        //    if (context.Orders.Count() == 0) AddOrders(context);
        //    if (context.DocumentCodes.Count() == 0) AddDocumentCodes(context);
        //    if (context.PackageTemplate.Count() == 0) AddPackageTemplates(context);
        //    // Testing 
        //    //if (context.Employees.Count() == 0) AddEmployees(context);
        //}


        //static private void AddUsers(SupplierPortalContext context)
        //{
        //    for (int i = 0; i < 500; i++)
        //    {
        //        string role = "Admin";
        //        role = i % 2 == 0 ? "User" : role;
        //        role = i % 3 == 0 ? "Read Only" : role;
        //        context.Users.Add(
        //            new User
        //            {
        //                Name = "Lance Mustard" + i.ToString(),
        //                OSUser = "worleyparsons\\lance.mustard" + i.ToString(),
        //                Email = "lance.mustard" + i.ToString() + "@worleyparsons.com",
        //                Role = role
        //            });
        //    }
        //    context.SaveChanges();
        //}

        //static private void AddRoles(SupplierPortalContext context)
        //{
        //    context.Roles.Add(new Role { Name = "Admin", });
        //    context.Roles.Add(new Role { Name = "User", });
        //    context.Roles.Add(new Role { Name = "Read Only", });
        //    context.SaveChanges();
        //    // Role Permissions
        //    context.RolePermission.Add(new RolePermission
        //    {
        //        Role = context.Roles.FirstOrDefault(x => x.Name == "Admin"),
        //        Permission = context.Permissions.FirstOrDefault(x => x.Description == "Administrator")
        //    });
        //    context.RolePermission.Add(new RolePermission
        //    {
        //        Role = context.Roles.FirstOrDefault(x => x.Name == "Read Only"),
        //        Permission = context.Permissions.FirstOrDefault(x => x.Description == "Login")
        //    });
        //}

        //static private void AddPermissions(SupplierPortalContext context)
        //{
        //    context.Permissions.Add(new Permission { Description = "Login", Group = "General" });
        //    context.Permissions.Add(new Permission { Description = "Administrator", Group = "General" });
        //    // Clients
        //    context.Permissions.Add(new Permission { Description = "Create Clients", Group = "Clients" });
        //    context.Permissions.Add(new Permission { Description = "Update Clients", Group = "Clients" });
        //    context.Permissions.Add(new Permission { Description = "Delete Clients", Group = "Clients" });
        //    context.Permissions.Add(new Permission { Description = "View Clients", Group = "Clients" });
        //    // Projects
        //    context.Permissions.Add(new Permission { Description = "Create Projects", Group = "Projects" });
        //    context.Permissions.Add(new Permission { Description = "Update Projects", Group = "Projects" });
        //    context.Permissions.Add(new Permission { Description = "Delete Projects", Group = "Projects" });
        //    context.Permissions.Add(new Permission { Description = "View Projects", Group = "Projects" });
        //    // Suppliers
        //    context.Permissions.Add(new Permission { Description = "Create Suppliers", Group = "Suppliers" });
        //    context.Permissions.Add(new Permission { Description = "Update Suppliers", Group = "Suppliers" });
        //    context.Permissions.Add(new Permission { Description = "Delete Suppliers", Group = "Suppliers" });
        //    context.Permissions.Add(new Permission { Description = "View Suppliers", Group = "Suppliers" });
        //    // Orders
        //    context.Permissions.Add(new Permission { Description = "Create Orders", Group = "Orders" });
        //    context.Permissions.Add(new Permission { Description = "Update Orders", Group = "Orders" });
        //    context.Permissions.Add(new Permission { Description = "Delete Orders", Group = "Orders" });
        //    context.Permissions.Add(new Permission { Description = "View Orders", Group = "Orders" });
        //    // Users
        //    context.Permissions.Add(new Permission { Description = "Create Users", Group = "Users" });
        //    context.Permissions.Add(new Permission { Description = "Update Users", Group = "Users" });
        //    context.Permissions.Add(new Permission { Description = "Delete Users", Group = "Users" });
        //    context.Permissions.Add(new Permission { Description = "View Users", Group = "Users" });
        //    // Roles
        //    context.Permissions.Add(new Permission { Description = "Create Roles", Group = "Roles" });
        //    context.Permissions.Add(new Permission { Description = "Update Roles", Group = "Roles" });
        //    context.Permissions.Add(new Permission { Description = "Delete Roles", Group = "Roles" });
        //    context.Permissions.Add(new Permission { Description = "View Roles", Group = "Roles" });
        //    // Document Codes
        //    context.Permissions.Add(new Permission { Description = "Create Document Codes", Group = "Document Codes" });
        //    context.Permissions.Add(new Permission { Description = "Update Document Codes", Group = "Document Codes" });
        //    context.Permissions.Add(new Permission { Description = "Delete Document Codes", Group = "Document Codes" });
        //    context.Permissions.Add(new Permission { Description = "View Document Codes", Group = "Document Codes" });
        //    context.SaveChanges();
        //}

        //static private void AddEmployees(SupplierPortalContext context)
        //{
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Klay Thompson",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Kevon Looney",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Draymond Green",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Patrick McCaw",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Damian Jones",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Jordan Bell",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Stephen Curry",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Kevin Durant",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Andre Iguodala",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Shaun Livingston",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Nick Young",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Zaza Pachulia",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Omri Casspi",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "David West",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "JaVale McGee",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Quinn Cook",
        //    //    Gender = "Male"
        //    //});
        //    //context.Employees.Add(new Employee
        //    //{
        //    //    Name = "Chris Boucher",
        //    //    Gender = "Male"
        //    //});
        //    //context.SaveChanges();
        //}

        //static private void AddSuppliers(SupplierPortalContext context)
        //{
        //    foreach (string supplier in suppliers)
        //    {
        //        context.Suppliers.Add(new Supplier { Name = supplier });
        //    }
        //    context.SaveChanges();
        //}

        //static private void AddClients(SupplierPortalContext context)
        //{
        //    foreach (string client in clients)
        //    {
        //        context.Clients.Add(new Client { Name = client });
        //    }
        //    context.SaveChanges();
        //}

        //static private void AddProjects(SupplierPortalContext context)
        //{
        //    Random rnd = new Random();
        //    foreach (string project in projects)
        //    {
        //        int i = rnd.Next(0, clients.Length);
        //        Client client = context.Clients.FirstOrDefault(x => x.Name == clients[i]);
        //        context.Projects.Add(new Project
        //        {
        //            Name = project,
        //            Client = client
        //        });
        //    }
        //    context.SaveChanges();
        //}

        //static private void AddOrders(SupplierPortalContext context)
        //{
        //    Random rnd = new Random();
        //    foreach (string order in orders)
        //    {
        //        int i = rnd.Next(0, suppliers.Length);
        //        Supplier supplier = context.Suppliers.FirstOrDefault(x => x.Name == suppliers[i]);
        //        i = rnd.Next(0, projects.Length);
        //        Project project = context.Projects.FirstOrDefault(x => x.Name == projects[i]);
        //        context.Orders.Add(new Order
        //        {
        //            Number = "PO-" + rnd.Next(0, 1000).ToString().PadLeft(6, '0'),
        //            Description = order,
        //            RequisitionNumber = "REQ" + rnd.Next(0, 1000).ToString().PadLeft(6, '0'),
        //            ResponsibleEngineer = engineers[rnd.Next(0, engineers.Length - 1)],
        //            AwardDate = DateTime.Now.AddDays(rnd.Next(0, 30)),
        //            Project = project,
        //            Supplier = supplier
        //        });
        //    }
        //    context.SaveChanges();
        //}

        //static private void AddDocumentCodes(SupplierPortalContext context)
        //{
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A", Description = "Supplier Management & Contract Execution Documents" });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B", Description = "Schedules & Engineering Lists" });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C", Description = "Calculations & Sizing" });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D", Description = "Drawings" });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E", Description = "Performance & General Data" });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F", Description = "Specifications, Design Reports & Other Technical Data" });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G", Description = "Quality Assurance, Inspection & Testing" });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "H", Description = "Packing, Shipping & Preservation" });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J", Description = "Installation, Operating & Maintenance Data" });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y", Description = "Project Specific Documents" });
        //    context.SaveChanges();

        //    context.DocumentCodes.Add(new DocumentCode { Code = "A101", Description = "Supplier Document Schedule (SDS)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A102", Description = "Supplier Data Requirements List (SDRL)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A103", Description = "Fuel Consumption On site", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A104", Description = "Health Safety & Environmental Statistics", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A105", Description = "Health Safety & Environmental Management Plan", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A106", Description = "Personnel Grievances & Disputes", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A107", Description = "Personnel Hours Worked", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A108", Description = "Personnel Labor Force", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A109", Description = "Program, 3 Week Look-ahead", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A110", Description = "Progress Reports", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A111", Description = "Project Schedule", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A112", Description = "Project Status", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A113", Description = "Sub-Suppliers List", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A114", Description = "Sub-Suppliers List (Major Sub-Orders)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A115", Description = "Supplier Contract Organization Chart", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A116", Description = "Supplier Previous Experience & History", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A117", Description = "Working Time Lost", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A118", Description = "Sub Order Schedule (Detailing Sub-Supplier’s)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "A999", Description = "Misc. Supplier Management & Contract Execution Documents", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "A") });

        //    context.DocumentCodes.Add(new DocumentCode { Code = "B101", Description = "Alarm & Trip Schedule", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B102", Description = "Cable Schedule", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B103", Description = "Electrical Equipment List", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B104", Description = "Electrical Load / Motor / Power Consumption List ", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B105", Description = "Equipment List", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B106", Description = "Hazardous Area Dossier", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B107", Description = "Input / Output Schedule", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B108", Description = "Instrument Equipment List", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B109", Description = "Instrument Index", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B110", Description = "Instrument Set Point Schedule", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B111", Description = "Junction Box Schedule", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B112", Description = "Materials, Bill of", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B113", Description = "Materials Selection Table", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B114", Description = "Piping Line List", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B115", Description = "Tie-In List", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "B999", Description = "Miscellaneous Engineering Lists & Schedules", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "B") });

        //    context.DocumentCodes.Add(new DocumentCode { Code = "C101", Description = "Civil Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C102", Description = "Electrical Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C103", Description = "Heat Emission Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C104", Description = "Instrumentation Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C105", Description = "Instrumentation: Intrinsic Safety Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C106", Description = "Instrumentation: Microwave Path Performance Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C107", Description = "Lifting Analysis / Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C108", Description = "Mechanical Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C109", Description = "Mechanical: Pressure Vessel / Tank Design Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C110", Description = "Mechanical: Rotor Dynamic, Lateral / Torsional Analysis", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C111", Description = "Mechanical: Bearing Loading, Sizing & Life Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C112", Description = "Mechanical: Coupling Selection Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C113", Description = "Mechanical: Lube & Seal Oil System Sizing Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C114", Description = "Noise level & Attenuation Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C115", Description = "Piping Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C116", Description = "Piping Stress Calculations / Analysis", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C117", Description = "Pressure Drop / Flow Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C118", Description = "Process / Utility Calculations, Heat / Mass Balance", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C119", Description = "Process: Heat Exchanger Thermal Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C120", Description = "Structural Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C121", Description = "Valve Sizing, Anti-Surge, ESD, Relief, Rupture Disc Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C122", Description = "Ventilation & Air Conditioning Calculations / Sizing", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C123", Description = "SIL Calculations", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "C999", Description = "Miscellaneous Calculations & Sizing", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "C") });

        //    context.DocumentCodes.Add(new DocumentCode { Code = "D101", Description = "Architectural Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D102", Description = "Assembly Detail Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D103", Description = "Building / Shelter Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D104", Description = "CAD Model", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D105", Description = "Civil Drwgs: General Arrangements / Layouts & Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D106", Description = "Civil Drwgs: Miscellaneous", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D107", Description = "Communication Network Schematic / Drawing", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D108", Description = "Control Drwgs: Cause & Effect Diagrams", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D109", Description = "Control Drwgs: Control System Interfaces Block Diagram", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D110", Description = "Control Drwgs: Logic", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D111", Description = "Control Drwgs: Schematics", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D112", Description = "Electrical Drwgs: Cable Block", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D113", Description = "Electrical Drwgs: Earthing Layout / Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D114", Description = "Electrical Drwgs: Equip't Details / Parts / Mat'ls / Cross Sections", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D115", Description = "Electrical Drwgs: Equipment Item General Arrangements", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D116", Description = "Electrical Drwgs: General Arrangements / Layouts", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D117", Description = "Electrical Drwgs: Interconnection", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D118", Description = "Electrical Drwgs: Interface Location & Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D119", Description = "Electrical Drwgs: Miscellaneous", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D120", Description = "Electrical Drwgs: Panel General Arrangements / Layouts", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D121", Description = "Electrical Drwgs: Schematics", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D122", Description = "Electrical Drwgs: Single Line", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D123", Description = "Electrical Drwgs: Termination", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D124", Description = "Electrical Drwgs: Wiring Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D125", Description = "Instrumentation Drwgs: Cable Block", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D126", Description = "Instrumentation Drwgs: Earthing Layout / Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D127", Description = "Instrumentation Drwgs: Equip't Details / Parts / Mat'ls / Cross Sect's", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D128", Description = "Instrumentation Drwgs: Equipment Item General Arrangements", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D129", Description = "Instrumentation Drwgs: General Arrangements / Layouts", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D130", Description = "Instrumentation Drwgs: Hook-Up", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D131", Description = "Instrumentation Drwgs: Interconnection", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D132", Description = "Instrumentation Drwgs: Interface Location & Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D133", Description = "Instrumentation Drwgs: Loop", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D134", Description = "Instrumentation Drwgs: Miscellaneous", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D135", Description = "Instrumentation Drwgs: Panel General Arrangements / Layouts", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D136", Description = "Instrumentation Drwgs: Schematics (Wiring)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D137", Description = "Instrumentation Drwgs: Termination", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D138", Description = "Instrumentation Drwgs: Wiring Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D139", Description = "Lifting Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D140", Description = "Mechanical Drwgs: Equip't Details / Parts / Mat'ls / Cross Sections", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D141", Description = "Mechanical Drwgs: Equipment Item General Arrangements", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D142", Description = "Mechanical Drwgs: General Arrangements / Layouts", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D143", Description = "Mechanical Drwgs: Hydraulic Schematics", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D144", Description = "Mechanical Drwgs: Interface Location & Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D145", Description = "Mechanical Drwgs: Miscellaneous", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D146", Description = "Mechanical Seal Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D147", Description = "Nameplate Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D148", Description = "Piping Drwgs: Equipment Details / Parts / Materials / Cross Sections", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D149", Description = "Piping Drwgs: Equipment Item General Arrangements", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D150", Description = "Piping Drwgs: General Arrangements / Layouts", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D151", Description = "Piping Drwgs: Interface Location & Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D152", Description = "Piping Drwgs: Isometric", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D153", Description = "Piping Drwgs: Miscellaneous", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D154", Description = "Process Drwgs: Miscellaneous", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D155", Description = "Process Flow Diagrams", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D156", Description = "Process: Piping & Instrumentation Diagrams (P&IDs)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D157", Description = "Shop Fabrication Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D158", Description = "Structural Drwgs: General Arrangements / Layouts & Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D159", Description = "Structural Drwgs: Interface Location & Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D160", Description = "Structural Drwgs: Miscellaneous", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D161", Description = "Support / Foundation Loadings with Anchor Bolt Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D162", Description = "Trace Heating", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "D999", Description = "Miscellaneous Drwgs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "D") });

        //    context.DocumentCodes.Add(new DocumentCode { Code = "E101", Description = "Catalogue Data / Data Sheets (Manufacturer's Standard)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E102", Description = "Control System Hardware Documentation", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E103", Description = "Electric Motor Performance Curves at 80% & 100% Rated Voltage", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E104", Description = "Electrical Equipment Data Sheets", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E105", Description = "Electrical Equipment Performance Curves & Data", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E106", Description = "Electrical Protection Curves, Data & Rating", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E107", Description = "Electrical: Lighting Performance Data", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E108", Description = "Electrical: Power System Analysis Data", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E109", Description = "Emission Data, Atmospheric", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E110", Description = "Instrument Data Sheets", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E111", Description = "Instrumentation Performance Curves & Data", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E112", Description = "Mechanical / Process Equipment Data Sheets", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E113", Description = "Mechanical / Process Equipment Performance Curves & Data", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E114", Description = "Mechanical: Coupling Details", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E115", Description = "Mechanical: Engine Performance Curves", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E116", Description = "Noise Level Data Sheets", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E117", Description = "Nozzle Loads (Acceptable Loads)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E118", Description = "Torque / Speed Starting Curves, Equipment & Driver", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E119", Description = "Waste / Production Estimates / Recycle Opportunities Information", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E120", Description = "Weight & Centre of Gravity Data Sheet", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "E999", Description = "Miscellaneous Performance & General Data", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "E") });

        //    context.DocumentCodes.Add(new DocumentCode { Code = "F101", Description = "Communications Address Map", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F102", Description = "Computer System Documentation", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F103", Description = "Control Philosophy / Functional Specification", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F104", Description = "Control System Configuration", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F105", Description = "Control System Data Files", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F106", Description = "Control System Display & Graphics", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F107", Description = "NACE Requirements", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F108", Description = "Radio Telemetry Technical Analysis Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F109", Description = "Reliability & Availability", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F110", Description = "Software Listing", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F111", Description = "Surface Preparation & Painting Specification", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "F999", Description = "Miscellaneous Specifications, Design Reports & Technical Data", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "F") });

        //    context.DocumentCodes.Add(new DocumentCode { Code = "G101", Description = "Certificate of Compliance - Sub-Supplier", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G102", Description = "Certificate of Compliance - Supplier", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G103", Description = "Certifying Authority Certification, Release Notes & Waivers", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G104", Description = "Civil Inspection & Test Certificates / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G105", Description = "Civil Inspection & Test Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G106", Description = "Cleanliness Certification", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G107", Description = "Control / Functional Test Certificates / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G108", Description = "Control / Functional Test Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G109", Description = "Design Verification / Third Party Validation", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G110", Description = "Dimensional Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G111", Description = "Electrical Equipment / Electrical Installation Certification", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G112", Description = "Electrical Inspection & Test Certificates / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G113", Description = "Electrical Inspection & Test Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G114", Description = "Electrical Type Test Certificates / Results", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G115", Description = "Fire Test Certificates", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G116", Description = "Flushing Procedure", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G117", Description = "Hazardous Area Certification", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G118", Description = "Heat Treatment Certificates / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G119", Description = "Heat Treatment Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G120", Description = "Inspection & Test Plan (ITP)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G121", Description = "Inspection & Test Plan (ITP), Sub-Supplier", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G122", Description = "Instrumentation Calibration, Certificates & Records", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G123", Description = "Instrumentation Certification", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G124", Description = "Instrumentation Inspection & Test Certificates / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G125", Description = "Instrumentation Inspection & Test Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G126", Description = "ISO 9000 Certification", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G127", Description = "Lifting Equipment Certificates", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G128", Description = "Lifting Proof Load Certification", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G129", Description = "Manufacturer's Data Report(MDR) / Manuf.Record Book(MRB)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G130", Description = "Manufacturer's Data Report(MDR) / Manuf.Record Book(MRB) Index", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G131", Description = "Manufacturing / Fabrication Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G132", Description = "Materials Traceability Records", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G133", Description = "Materials Certification", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G134", Description = "Materials Inspection & Test Certificates / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G135", Description = "Materials Inspection & Test Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G136", Description = "Materials: Supplier Declaration of Material Supplied", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G137", Description = "Mechanical Inspection & Test Certificates / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G138", Description = "Mechanical Inspection & Test Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G139", Description = "Name Plate Rubbing / Photographs", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G140", Description = "Noise Test Certificates / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G141", Description = "Noise Test Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G142", Description = "Non-Conformance Reports / Concession Requests", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G143", Description = "Non-Destructive Examination (NDE) Operator Qualifications", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G144", Description = "Non-Destructive Examination (NDE) Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G145", Description = "Non-Destructive Examination (NDE) Reports / Records", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G146", Description = "Performance Guarantee", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G147", Description = "Performance Test / FAT / SAT Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G148", Description = "Performance Test / FAT / SAT / Results & Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G149", Description = "Pressure Test Certificates / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G150", Description = "Pressure Test Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G151", Description = "Quality Manual", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G152", Description = "Quality Plan", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G153", Description = "Release Certification from Purchaser's Inspector, Notes & Waivers", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G154", Description = "Surface Protection & Painting Certificate of Compliance", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G155", Description = "Surface Protection & Painting Insp. & Test Cert's / Results / Report", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G156", Description = "Surface Protection & Painting Inspection & Test Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G157", Description = "Weight Certificates & Weight Reconciliation Statements", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G158", Description = "Weight Control / Weighing Procedure", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G159", Description = "Weld & NDE Traceability / Location Plans / Maps", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G160", Description = "Weld Procedure Qualification Records (WPQR)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G161", Description = "Weld Procedure Specifications (WPS)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G162", Description = "Welder Qualification Certificates", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G163", Description = "Welder Qualification Register", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G164", Description = "PMI Test Procedure", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "G999", Description = "Miscellaneous Quality Assurance, Inspection & Testing", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "G") });

        //    context.DocumentCodes.Add(new DocumentCode { Code = "H101", Description = "Hazardous Material Shipping Certificates", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "H") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "H102", Description = "Long Term Storage & Preservation Procedure", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "H") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "H103", Description = "Shipping Preparation, Packing, Handling & Storage Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "H") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "H104", Description = "Shipping, Packing & Import Certificates", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "H") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "H999", Description = "Miscellaneous Packing, Shipping & Preservation Data", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "H") });

        //    context.DocumentCodes.Add(new DocumentCode { Code = "J101", Description = "Commissioning / Pre-Commissioning Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J102", Description = "Environmental Sampling & Analytical Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J103", Description = "Erection Drawings", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J104", Description = "Erection Fastener Schedule", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J105", Description = "Installation Operating & Maintenance Manual (IOM)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J106", Description = "Lube Oil, Operating Fluids & Utility Requirements", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J107", Description = "Material Safety Data Sheets (MSDS)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J108", Description = "Spare Parts & Interchangeability Record (SPIR)", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J109", Description = "Spare Parts Lists - Commissioning, Operating", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J110", Description = "Spare Parts Lists - Insurance", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J111", Description = "Special Tools & Lifting Devices List", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J112", Description = "Unpacking, Handling, Lifting, Erection & Installation Procedures", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J113", Description = "Installation Operating & Maintenance Manual (IOM) Index", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "J999", Description = "Miscellaneous Installation, Operating & Maintenance Data", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "J") });

        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y101", Description = "Packaged Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y102", Description = "Architectural Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y103", Description = "Bulk Material Handling Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y104", Description = "Civil / Structural Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y105", Description = "Drilling & Well Completions Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y106", Description = "HVAC Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y107", Description = "Instrument Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y108", Description = "Marine Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y109", Description = "Mechanical Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y110", Description = "Mechanical Handling Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y111", Description = "Safety & Rescue Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y112", Description = "Solids Processing Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y113", Description = "Subsea Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y115", Description = "Lighting & Small Power Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y116", Description = "Electrical Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y117", Description = "Subsea Instrument Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.DocumentCodes.Add(new DocumentCode { Code = "Y118", Description = "Telecommunications Equipment Register / Template", Parent = context.DocumentCodes.FirstOrDefault(x => x.Code == "Y") });
        //    context.SaveChanges();
        //}

        //static private void AddPackageTemplates(SupplierPortalContext context)
        //{
        //    PackageTemplate template = new PackageTemplate { Name = "Basic Engineering Package" };
        //    context.PackageTemplate.Add(template);
        //    Random rnd = new Random();
        //    int packages = rnd.Next(context.DocumentCodes.Count());
        //    for (int i = 0; i < packages; i++)
        //    {
        //        int id = rnd.Next(packages);
        //        DocumentCode documentCode = context.DocumentCodes.FirstOrDefault(x => x.Id == id);
        //        if (documentCode != null)
        //        {
        //            if (documentCode.ParentId != 0)
        //            {
        //                context.PackageTemplateDocumentCodes.Add(new PackageTemplateItem { PackageTemplate = template, DocumentCode = documentCode });
        //            }
        //        }
        //    }
        //    context.SaveChanges();
        //}
    }
}