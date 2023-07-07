﻿using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext dc;

        public CityRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddCity(City city)
        {
             dc.Cities.Add(city);
        }

        public void DeleteCity(int cityId)
        {
            var city = dc.Cities.Find(cityId);

            if (city != null)
            {
                dc.Cities.Remove(city);
            }
        }

        public async Task<City> FindCity(int cityId)
        {
           return await dc.Cities.FindAsync(cityId);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
          
        }

      
    }
}
