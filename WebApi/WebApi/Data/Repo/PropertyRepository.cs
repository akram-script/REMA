﻿using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Data.Repo
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext lDc;
        public PropertyRepository(DataContext dc)
        {
            lDc = dc;
        }
         public void AddProperty(Property property)
        {
        
            lDc.Properties.Add(property);
        }

       
        public async Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent)
        {
           var properties = await lDc.Properties.Where(p => p.SellRent == sellRent)
                                      .Include(p=> p.PropertyType)
                                      .Include(p=>p.City)
                                      .Include(p=>p.FurnishingType)
                                      .Include(p=>p.Photos)
                                      .ToListAsync();

            return properties;
        }

         public async Task<Property> GetPropertyDetailAsync(int id)
        {
            var properties = await lDc.Properties
            .Include(p => p.PropertyType)
            .Include(p => p.City)
            .Include(p => p.FurnishingType)
            .Include(p => p.Photos)
            .Where(p => p.Id == id)
            .FirstAsync();

            return properties;
        }

        public async Task<Property> GetPropertyByIdAsync(int id)
        {
            var properties = await lDc.Properties
            .Include(p => p.Photos)
            .Where(p => p.Id == id)
            .FirstOrDefaultAsync();
            return properties;
        }

        public void DeleteProperty(int id)
        {
            throw new NotImplementedException();
        }
    }
}

