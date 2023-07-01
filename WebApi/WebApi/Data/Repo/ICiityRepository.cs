using WebApi.Models;

namespace WebApi.Data.Repo
{
    public interface ICiityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();

        void AddCity(City city);
        void DeleteCity(int cityId);
        Task<bool> SaveAsync();
    }
}
