using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Models.Request;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using backend.Service.EmailService;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly IEmailService _emailService;
    public EmailController(IEmailService emailService)
    {
        _emailService = emailService;
    }
    [HttpPost]
    public IActionResult SendEmail(EmailRequest request)
    {
        _emailService.SendEmail(request);
        return Ok();
    }
}
