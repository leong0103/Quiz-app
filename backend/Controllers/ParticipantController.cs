using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Models.Request;

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

    [HttpPut("{id}")]
    public async Task<IActionResult> SaveParticipantResult(int id, ParticipantResultRequest participantResultRequest)
    {
        if(id != participantResultRequest.Id)
        {
            return BadRequest();
        }

        Participant participant = _context.Participants.Find(id) ?? throw new ArgumentException("No this participant, Please Log In Again");
        participant.Score = participantResultRequest.Score;
        participant.TimeTaken = participantResultRequest.TimeTaken;

        _context.Entry(participant).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return NotFound();
        }

        return NoContent();
    }


}
