using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Participant
    {
        public int Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? Email { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? Name { get; set; }

        public int Score { get; set; }

        public int TimeTaken { get; set; }
    }
}