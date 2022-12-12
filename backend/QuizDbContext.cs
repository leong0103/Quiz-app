using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend
{
    public class QuizDbContext : DbContext
    {
        protected readonly IConfiguration _configuration;

        public QuizDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
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
            // base.OnConfiguring(options);
            options.UseSqlServer(_configuration.GetConnectionString("SQLServerDb"));
        }


    }
}