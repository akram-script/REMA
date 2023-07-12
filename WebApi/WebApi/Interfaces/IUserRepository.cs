using WebApi.Dtos;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string username, string password);
        void Register(LoginReqDto loginReqDto);
        Task<bool> UserAlreadyexists(string username);
    }
}
