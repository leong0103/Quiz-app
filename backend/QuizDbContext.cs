using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend
{
    public class QuizDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public QuizDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public DbSet<Question> Question { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            
            //For postgreSQL
            // options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));

            //For SQL Server
            base.OnConfiguring(options);
            options.UseSqlServer("Server=localhost;Database=quiz-app-db;User Id=SA;Password=Password1234#;TrustServerCertificate=True;");
        }


    }
}