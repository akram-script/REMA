using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;

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
        [HttpGet("{id}")]
        public string Get(int id) { return "Atlanta"; }
    }
}
