using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext dc;

        public CityController(DataContext dc)
        {
            this.dc = dc;
        }
        [HttpGet]
        public async  Task<IActionResult> GetCities()
        {
            var Cities = await dc.Cities.ToListAsync();
            return  Ok(Cities);
        }
       
        [HttpPost("add")]
        [HttpPost("add/{CityName}")]
        public async Task<IActionResult> AddCity(string CityName)
        {
            var city = new City()
            {
                Name = CityName,
            };
           await dc.Cities.AddAsync(city);
           await dc.SaveChangesAsync();
            return Ok(city);
        }
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {
            
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await dc.Cities.FindAsync(id);

            if (city != null)
            {
                dc.Cities.Remove(city);
                await dc.SaveChangesAsync();
            }
            return Ok(id);
        }
        [HttpGet("{id}")]
        public string Get(int id) { return "Atlanta"; }
    }
}
