using AutoMapper;
using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City,CityDto>().ReverseMap();
            CreateMap<City, CityUpdateDto>().ReverseMap();

        }

    }
}
