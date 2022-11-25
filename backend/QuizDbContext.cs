using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend
{
    public class QuizDbContext:DbContext
    {
        protected readonly IConfiguration Configuration;

    public QuizDbContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    
        public DbSet<Question> Question { get; set; }
        public DbSet<Participant> Participants { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to postgres with connection string from app settings
        options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
    }


    }
}