using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApi.Data;
using WebApi.Extentions;
using WebApi.Helper;
using WebApi.Interfaces;
using WebApi.Services;

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
var Dbuilder = new SqlConnectionStringBuilder(
                Configuration.GetConnectionString("DefaultConnection"));

Dbuilder.Password = Environment.GetEnvironmentVariable("REMADBpass");

var connectionString = Dbuilder.ConnectionString;

builder.Services.AddDbContext<DataContext>(options =>
options.UseSqlServer(connectionString));
//repo injection
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IPhotoService,PhotoService>();
//adding automapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
//newtonsoft
builder.Services.AddControllers().AddNewtonsoftJson();
//authentication 
var secretKey = Environment.GetEnvironmentVariable("ASPNETCORE_AppSettings__Key");
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
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
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "AllowOrigin",
        builder => {
            builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.ConfigureExceptionHandler();

//app cors
app.UseHttpsRedirection();
app.UseRouting();
app.UseHsts();
app.UseHttpsRedirection(); 
app.UseCors("AllowOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Run();
