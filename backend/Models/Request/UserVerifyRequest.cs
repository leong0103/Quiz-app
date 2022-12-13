using System.ComponentModel.DataAnnotations;

namespace backend.Models.Request
{
    public class UserVerifyRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Token { get; set; } = string.Empty;
    }
}