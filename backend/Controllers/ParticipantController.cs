using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParticipantController : ControllerBase
{
    private readonly QuizDbContext _context;

    public ParticipantController(QuizDbContext contect)
    {
        _context = contect;
    }

    [HttpPost]
    public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
    {
        var temp = _context.Participants
            .Where(p => p.Name == participant.Name && p.Email == participant.Email)
            .FirstOrDefault();
        if(temp == null)
        {
            _context.Participants.Add(participant);
            await _context.SaveChangesAsync();
        } 
        else
        {
            participant = temp;
        }

        return Ok(participant);
    }


}
