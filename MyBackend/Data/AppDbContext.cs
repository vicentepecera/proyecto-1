using Microsoft.EntityFrameworkCore;
using MyBackend.Models;

namespace MyBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    
    public DbSet<Game> GameDetails => Set<Game>();
    
    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
    
    public DbSet<Biblioteca> Bibliotecas => Set<Biblioteca>();

    public DbSet<ProfileFavoriteGenres> ProfileFavoriteGenres => Set<ProfileFavoriteGenres>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GenreResult>().HasNoKey();
    }
}