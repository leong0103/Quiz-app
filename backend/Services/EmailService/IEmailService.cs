using backend.Models;

namespace backend.Service.EmailService
{
    public interface IEmailService
    {
        void SendEmail(EmailRequest request);
    }
} 