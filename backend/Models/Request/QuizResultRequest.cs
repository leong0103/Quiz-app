using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Request
{
    public class ParticipantResultRequest
    {
        public int Id { get; set; }
        
        public int Score { get; set; }

        public int TimeTaken { get; set; }
    }
}