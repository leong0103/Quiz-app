using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class EmailRequest
    {
        public string To { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public string Body { get; set; } = string.Empty;
    }
}

