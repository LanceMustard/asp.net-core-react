using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.StaticFiles;
using Core.React.Models;

namespace Core.React
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>(opt => opt.UseInMemoryDatabase("EmployeesDB"));
            services.AddMvc();
            // determine Cross-Origin Request policy
            //if (Environment.GetEnvironmentVariable("PORT") == null )
            //{
                // development environment only, allow any origin to access the API
                services.AddCors(o => o.AddPolicy("CustomCORS", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                }));
            //}
            //else
            //{
            //    // production / testing enviroment
            //    services.AddCors(o => o.AddPolicy("CustomCORS", builder =>
            //    {
            //        builder.Build();
            //    }));
            //}
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("CustomCORS");
            }

            app.UseMvc();
            app.UseStaticFiles();
        }
    }
}
