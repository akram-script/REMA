using Microsoft.AspNetCore.Mvc;
using WebApi.Data.Repo;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICiityRepository cityRepo;

        public CityController( ICiityRepository cityRepo)
        {
            this.cityRepo = cityRepo;
        }
        /// <summary>
        /// get all cities from db
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var Cities = await cityRepo.GetCitiesAsync();
            return StatusCode(201);
        }
        /// <summary>
        /// add a city to the db 
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {
            cityRepo.AddCity(city);
            await cityRepo.SaveAsync();
            return StatusCode(201);
        }
        /// <summary>
        /// deletes city by id 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            cityRepo.DeleteCity(id);
            await cityRepo.SaveAsync();
            return StatusCode(201);
        }
       
    }
}
