using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc) {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string username, string password)
        {
            return await dc.Users.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
        }
    }
}