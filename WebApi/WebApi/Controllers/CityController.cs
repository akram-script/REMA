using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork uwo;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork uwo, IMapper mapper)
        {
            this.uwo = uwo;
            this.mapper = mapper;
        }
        /// <summary>
        /// get all cities from db
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            var Cities = await uwo.CityRepository.GetCitiesAsync();
            var CitiesDto = mapper.Map<IEnumerable<CityDto>>(Cities);
            return Ok(CitiesDto);
        }
        /// <summary>
        /// add a city to the db 
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto pCity)
        {
            var city = mapper.Map<City>(pCity);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;

            uwo.CityRepository.AddCity(city);
            await uwo.SaveAsync();
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
            uwo.CityRepository.DeleteCity(id);
            await uwo.SaveAsync();
            return StatusCode(201);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto city)
        {
            if(id != city.Id)
                return BadRequest("Update Not Allowed");
            var dbCity = await uwo.CityRepository.FindCity(id);
            if (dbCity == null)
                return BadRequest("Update Not Allowed");
            dbCity.LastUpdatedBy = 1;
            dbCity.LastUpdatedOn = DateTime.Now;
            mapper.Map(city, dbCity);
            await uwo.SaveAsync();
            return StatusCode(200);

        }
        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto city)
        {
            var dbCity = await uwo.CityRepository.FindCity(id);
            dbCity.LastUpdatedBy = 1;
            dbCity.LastUpdatedOn = DateTime.Now;
            mapper.Map(city, dbCity);
            await uwo.SaveAsync();
            return StatusCode(200);

        }
        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id,JsonPatchDocument<City> cityToPatch)
        {
            var dbCity = await uwo.CityRepository.FindCity(id);
            dbCity.LastUpdatedBy = 1;
            dbCity.LastUpdatedOn = DateTime.Now;

            cityToPatch.ApplyTo(dbCity,ModelState);
            await uwo.SaveAsync();
            return StatusCode(200);

        }

    }
}
