using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using QuantumIt.Core;
using QuantumIt.Persistence;
using AutoMapper;

namespace QuantumIt
{
    public class Startup
    {
        private IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            // Database connection or DBContext
            services.AddDbContext<QuantumItDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Inject repositories
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ISchoolClassRepository, SchoolClassRepository>();
            services.AddScoped<IStudentRepository, StudentRepository>();

            // CORS policy
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            // Auto Mapper
            services.AddAutoMapper(typeof(Startup));

            services.AddMvc().AddNewtonsoftJson();

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "QuantumIT API", Version = "v1" });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "QuantumIT API V1");
            });

            app.UseCors("CorsPolicy");
            app.UseRouting();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
