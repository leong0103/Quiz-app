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
        var randomFiveQuestion = await (_context.Question
        .Select(question => new
        {
            QuestionId = question.Id,
            QuestionDetails = question.QuestionDetails,
            ImageURL = question.ImageURL,
            Options = new string[] { question.Option1, question.Option2, question.Option3, question.Option4 }
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
                Options = new string[] { y.Option1, y.Option2, y.Option3, y.Option4 },
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


}
