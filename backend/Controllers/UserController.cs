using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Models.Request;
using System.Security.Cryptography;
using backend.Service.EmailService;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly QuizDbContext _context;
    private readonly IEmailService _emailService;

    public UserController(QuizDbContext contect, IEmailService emailService)
    {
        _context = contect;
        _emailService = emailService;

    }

    //POST: api/user/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterRequest request)
    {
        if (_context.Users.Any(user => user.Email == request.Email))
        {
            return BadRequest("Email already exists.");
        }

        CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

        User user = new User
        {
            Email = request.Email,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            VerificationToken = CreateRandomToken(),
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        string UrlInEmail = $"http://localhost:3000/verify-user?email={user.Email}";
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.To = $"{user.Email}";
        emailRequest.Subject = "Verify your account";
        emailRequest.Body = 
            $"<h3>Please click following Verify link to verify your account</h3> <a href={UrlInEmail}>Verify link</a> <p>Verify code: {user.VerificationToken}</p>";
        _emailService.SendEmail(emailRequest);

        return Ok(user.Email);
    }

    //POST: api/user/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == request.Email);

        if (user == null)
        {
            return BadRequest("User not found");
        }

        if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
        {
            return BadRequest("Password is incorrect.");
        }

        if (user.VerifiedAt == null)
        {
            return BadRequest("Not verified");
        }

        return Ok($"Welcome back, {user.Email}");
    }

    //POST: api/user/verify
    [HttpPost("verify")]
    public async Task<IActionResult> Verify(UserVerifyRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == request.Email);

        if(user == null || user.VerificationToken != request.Token)
        {
            return BadRequest("Invalid token");
        }

        user.VerifiedAt = DateTime.Now;
        await _context.SaveChangesAsync();

        return Ok("User verified");
    }

    //POST: api/user/forgot-password
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(string email)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == email);

        if(user == null)
        {
            return BadRequest("User not found.");
        }

        user.PasswordResetToken = CreateRandomToken();
        user.ResetTokenExpires = DateTime.Now.AddDays(1);
        await _context.SaveChangesAsync();

        EmailRequest emailRequest = new EmailRequest();
        emailRequest.To = "dell.luettgen62@ethereal.email";
        emailRequest.Subject = "Reset password";
        emailRequest.Body = $"<h3>Please copy following Verify code to website</h3><p>Verify code: {user.PasswordResetToken}</p>";
        _emailService.SendEmail(emailRequest);

        return Ok("You may now reset your password.");
    }

    //POST: api/user/reset-password
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.PasswordResetToken == request.Token);
        if(user == null || user.ResetTokenExpires < DateTime.Now)
        {
            return BadRequest("Invalid Token");
        }

        CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
        user.PasswordResetToken = null;
        user.ResetTokenExpires = null;
        await _context.SaveChangesAsync();

        return Ok("Password successfully reset.");
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac
                .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512(passwordSalt))
        {
            var computedHash = hmac
                .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }

    private string CreateRandomToken()
    {
        Random generator = new Random();
        return generator.Next(100000, 1000000).ToString("D6");
        // return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
    }
}
