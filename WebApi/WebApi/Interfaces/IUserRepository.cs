using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string username, string password);
    }
}
