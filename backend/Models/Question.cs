using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Question
    {
        public int Id { get; set; }

        [Column(TypeName = "varchar(250)")]
        public string? QuestionDetails { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? ImageURL { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? Option1 { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? Option2 { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? Option3 { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? Option4 { get; set; }

        public int Answer { get; set; }
    }   
}