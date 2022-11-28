using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Helper;
using Microsoft.EntityFrameworkCore;

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
        var randomFiveQuestion = await(_context.Question
        .Select(question => new {
            Id = question.Id,
            QuestionDetails = question.QuestionDetails,
            ImageURL = question.ImageURL,
            Options = new string[] {question.Option1, question.Option2, question.Option3, question.Option4}
        })
        .Take(5))
        .ToListAsync();
        randomFiveQuestion.Shuffle();
        return Ok(randomFiveQuestion);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Question>> GetQuestion(int id)
    {
        var question = await _context.Question.FindAsync(id);

        if(question == null)
        {
            return NotFound();
        }

        return question;
    }


}
