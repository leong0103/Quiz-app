using Microsoft.AspNetCore.Mvc;
using backend.Models;
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
        return await _context.Question.ToListAsync();
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
