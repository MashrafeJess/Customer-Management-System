using System.Data;
using Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using static System.Net.Mime.MediaTypeNames;
using static System.Reflection.Metadata.BlobBuilder;

namespace Database.Context
{
    public class CustomerContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(
                @"Host=localhost;Port=5432;Database=Customer_MS;Username=postgres;Password=22345;",
                npgsqlOptions => npgsqlOptions.EnableRetryOnFailure());
        }

        public DbSet<Customer> Customer { get; set; }
    }
}