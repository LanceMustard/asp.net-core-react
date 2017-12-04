﻿using System;
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
            if (context.Users.Count() == 0) AddUsers(context);
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
    }
}