using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QuantumIt.Persistence;
using Xunit;

namespace QuantumItTests
{
    public class DatabaseFixture : IDisposable
    {
        public QuantumItDbContext _context { get; }
        public DatabaseFixture()
        {
            // Get configuration
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile("appsettings.development.json", optional: true)
                .AddEnvironmentVariables()
                .Build();
            
            // Add EF service
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkSqlServer()
                .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<QuantumItDbContext>();

            builder.UseSqlServer(config["ConnectionStrings:DefaultConnection"])
                .UseInternalServiceProvider(serviceProvider);

            // Run migration
            _context = new QuantumItDbContext(builder.Options);
            _context.Database.Migrate();
        }
        
        // Dispose 
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
        }
    }


    [CollectionDefinition("Database collection")]
    public class DatabaseCollection : ICollectionFixture<DatabaseFixture>
    {
        // This class has no code, and is never created. Its purpose is simply
        // to be the place to apply [CollectionDefinition] and all the
        // ICollectionFixture<> interfaces.
    }
}