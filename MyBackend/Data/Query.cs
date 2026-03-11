// Services/Queries/Query.cs
using Microsoft.EntityFrameworkCore;
using MyBackend.Models;
using MyBackend.Data;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using MyBackend.DTO.Results;

namespace MyBackend.Data
{
    public static class Query
    {
        #region Games
        public static async Task<Game> GetGameByNameAsync(AppDbContext context, string name)
        {
            return await context.GameDetails
                .Where(game => game.Name == name)
                .FirstOrDefaultAsync();
        }
        
        public static async Task<List<Game>> GetGameByBiblioteca(AppDbContext context, List<int> ids)
        {
            return await context.GameDetails
                .Where(game => ids.Contains(game.AppID))
                .ToListAsync();
        }
        
        public static async Task<List<Game>> GetAllGamesAsync(AppDbContext context)
        {
            return await context.GameDetails.ToListAsync();
        }
        
        public static async Task<List<Game>> GetGamesByNameContainsAsync(AppDbContext context, string searchString)
        {
            return await context.GameDetails
                .Where(game => game.Name.Contains(searchString))
                .ToListAsync();
        }
        #endregion
        
        #region Profiles
        
        public static async Task<UserProfile?> GetProfileAsync(AppDbContext context, Guid id)
        {
            UserProfile? res =  await context.UserProfiles.Where(u => u.Id == id).FirstOrDefaultAsync();
            return res;
        }
        
        public static async Task<UserProfile?> GetProfileByUserAsync(AppDbContext context, Guid id)
        {
            UserProfile? res =  await context.UserProfiles.Where(u => u.UserId == id).FirstOrDefaultAsync();
            return res;
        }
        
        public static async Task<List<UserProfile>> GetProfilesByIds(AppDbContext context, List<Guid> ids)
        {
            List<UserProfile> res =  await context.UserProfiles.Where(u => ids.Contains(u.Id)).ToListAsync();
            return res;
        }
        
        #endregion
        
        #region Users
        
        public static async Task<User?> GetUserAsync(AppDbContext context, Guid id)
        {
            User? res =  await context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
            return res;
        }
        #endregion
        
        #region Bibliotecas
        
        public static async Task<List<Biblioteca>> GetBibliotecaByProfileAsync(AppDbContext context, Guid profileId)
        {
            return await context.Bibliotecas
                .Where(biblioteca => biblioteca.ProfileId == profileId)
                .ToListAsync();
        }
        
        public static async Task<List<Biblioteca>> GetBibliotecaByGame(AppDbContext context, int AppId)
        {
            return await context.Bibliotecas
                .Where(biblioteca => biblioteca.AppId == AppId)
                .ToListAsync();
        }
        
        #endregion
        
        #region Friends
        
        public static async Task<List<(string Genre, int Count)>> GetTopGenres(AppDbContext context, List<int> ids)
        {
            var genres = await context.GameDetails
                .Where(g => ids.Contains(g.AppID))
                .Select(g => g.Genres)
                .ToListAsync();

            var topGenres = genres
                .Where(g => !string.IsNullOrEmpty(g))
                .SelectMany(g => g.Split(',', StringSplitOptions.TrimEntries))
                .GroupBy(g => g)
                .OrderByDescending(g => g.Count())
                .Take(3)
                .Select(g => (Genre: g.Key, Count: g.Count()))
                .ToList();

            return topGenres;
        }
        
        public static async Task<List<GenreResult>> GetTopGenresByTime(AppDbContext context, Guid profileId)
        {
            var genres = await context
                .Set<GenreResult>()
                .FromSqlRaw(
                    "EXEC GetTopGenresByTime @ProfileId",
                    new SqlParameter("@ProfileId", profileId))
                .ToListAsync();

            return genres;
        }

        public static async Task<List<(Guid profileId, decimal affinity)>> GetTopFriends(AppDbContext context, Guid profileId)
        {
            // géneros del usuario
            var myGenres = await context.ProfileFavoriteGenres
                .Where(x => x.ProfileId == profileId)
                .ToListAsync();

            // géneros de otros usuarios
            var others = await context.ProfileFavoriteGenres
                .Where(x => x.ProfileId != profileId)
                .ToListAsync();

            // juegos del usuario
            var myGames = await context.Bibliotecas
                .Where(x => x.ProfileId == profileId)
                .Select(x => x.AppId)
                .ToListAsync();

            // juegos de otros usuarios
            var otherGames = await context.Bibliotecas
                .Where(x => x.ProfileId != profileId)
                .ToListAsync();

            // calcular juegos en común
            var commonGames = otherGames
                .GroupBy(x => x.ProfileId)
                .ToDictionary(
                    g => g.Key,
                    g => g.Count(x => myGames.Contains(x.AppId))
                );

            // calcular afinidad
            var result = others
                .GroupBy(x => x.ProfileId)
                .Select(user =>
                {
                    decimal genreAffinity = myGenres
                        .Join(
                            user,
                            g1 => g1.Genre,
                            g2 => g2.Genre,
                            (g1, g2) => Math.Min(g1.Score, g2.Score)
                        )
                        .Sum();

                    int games = commonGames.ContainsKey(user.Key)
                        ? commonGames[user.Key]
                        : 0;

                    decimal finalAffinity =
                        genreAffinity * 0.6m +
                        games * 0.3m;

                    return (profileId: user.Key, affinity: finalAffinity);
                })
                .OrderByDescending(x => x.affinity)
                .ToList();

            return result;
        }
        
        #endregion
    }
}