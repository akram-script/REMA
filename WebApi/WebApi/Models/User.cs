using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public Byte[] Password { get; set; }
        public Byte[] PasswordKey { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }

    }
}
