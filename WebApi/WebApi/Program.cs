using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Interfaces;
using AutoMapper;
using WebApi.Helper;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Builder;
using WebApi.Extentions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//services cors
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
//dbContext 
IConfigurationRoot Configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
//repo injection
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
//adding automapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
//newtonsoft
builder.Services.AddControllers().AddNewtonsoftJson();
//authentication 
var secretkey = Configuration.GetSection("AppSettings:key").Value;
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretkey));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(o =>
                {
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = key,
                    };
                });

var app = builder.Build();

// Configure the HTTP request pipeline.
app.ConfigureExceptionHandler();


//app cors
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("corsapp");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
