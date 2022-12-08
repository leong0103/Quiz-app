using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Helper;
using Microsoft.EntityFrameworkCore;
using backend.Models.Request;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionController : ControllerBase
{
    private readonly QuizDbContext _context;

    public QuestionController(QuizDbContext contect)
    {
        _context = contect;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Question>>> GetQuestion()
    {
        var randomFiveQuestion = await (_context.Question
        .Select(question => new
        {
            QuestionId = question.Id,
            QuestionDetails = question.QuestionDetails,
            ImageURL = question.ImageURL,
            Options = new string[] { question.Option1!, question.Option2!, question.Option3!, question.Option4! }
        })
        .Take(5))
        .ToListAsync();
        randomFiveQuestion.Shuffle();
        return Ok(randomFiveQuestion);
    }
    //POST: api/Question/GetAnswers
    [HttpPost]
    [Route("GetAnswers")]
    public async Task<ActionResult<Question>> RetrieveAnswers(int[] questionIds)
    {
        var answers = await (_context.Question
            .Where(x => questionIds.Contains(x.Id))
            .Select(y => new
            {
                QuestionId = y.Id,
                QuestionDetails = y.QuestionDetails,
                ImageURL = y.ImageURL,
                Options = new string[] { y.Option1!, y.Option2!, y.Option3!, y.Option4! },
                Answer = y.Answer
            })).ToListAsync();
        return Ok(answers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Question>> GetQuestion(int QuestionId)
    {
        var question = await _context.Question.FindAsync(QuestionId);

        if (question == null)
        {
            return NotFound();
        }

        return question;
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
