using System.Net.Http;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using MyBackend.Data;
using MyBackend.DTO;
using MyBackend.DTO.Results;
using MyBackend.Models;

namespace MyBackend.Controllers;

public class SteamLibraryController : ControllerBase
{
    private readonly AppDbContext _db;
    private const string API_KEY = "8373B61A647F40E23E71F4364E472DCF";

    public SteamLibraryController(AppDbContext db)
    {
        _db = db;
    }
    
    public async Task<BibliotecaResult> LinkSteamAccount(LinkSteamDTO dto)
    {
        BibliotecaResult data = new BibliotecaResult();

        try
        {
            // Crear HttpClient local
            using var client = new HttpClient();

            // Obtener steamid desde el link de Steam
            string steamId = ExtractSteamId(dto.SteamUrl);
            if (string.IsNullOrEmpty(steamId))
            {
                data.SetError("Steam ID no válido o no encontrado en el link");
                data.SetSuccess(false);
                return data;
            }

            // --- 1️⃣ Obtener información del usuario ---
            var urlUser = $"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key={API_KEY}&steamids={steamId}";
            var responseUser = await client.GetStringAsync(urlUser);
            using var docUser = JsonDocument.Parse(responseUser);
            var players = docUser.RootElement.GetProperty("response").GetProperty("players");

            if (players.GetArrayLength() == 0)
            {
                data.SetError("Usuario Steam no encontrado");
                data.SetSuccess(false);
                return data;
            }
            
            // --- 2️⃣ Obtener juegos del usuario ---
            var urlGames = $"https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key={API_KEY}&steamid={steamId}&include_appinfo=1&include_played_free_games=1";
            var responseGames = await client.GetStringAsync(urlGames);
            using var docGames = JsonDocument.Parse(responseGames);

            List<Biblioteca> gamesToSave = new List<Biblioteca>();
            if (docGames.RootElement.GetProperty("response").TryGetProperty("games", out var gamesArray))
            {
                foreach (var game in gamesArray.EnumerateArray())
                {
                    gamesToSave.Add(new Biblioteca
                    {
                        Id = Guid.NewGuid(),
                        ProfileId = dto.ProfileId,
                        AppId = game.GetProperty("appid").GetInt32(),
                        Name = game.GetProperty("name").GetString(),
                        PlaytimeMinutes = game.GetProperty("playtime_forever").GetInt32()
                    });
                }
            }

            // --- 3️⃣ Guardar juegos en la base de datos ---
            var oldGames = _db.Bibliotecas.Where(g => g.ProfileId == dto.ProfileId);
            _db.Bibliotecas.RemoveRange(oldGames);

            await _db.Bibliotecas.AddRangeAsync(gamesToSave);

            await _db.SaveChangesAsync();
            
            // Seccion para dejar calculados los juegos favoritos de alguien al registrarlo
            UserProfile profile = await Query.GetProfileAsync(_db,dto.ProfileId);
            profile!.SteamLink = dto.SteamUrl;
            _db.Update(profile);
            
            List<Biblioteca> bibliotecas = await Query.GetBibliotecaByProfileAsync(_db, profile.Id);
            List<int> ids = bibliotecas.Select(b => b.AppId) .ToList();
            List<(string, int)> favGenres = await Query.GetTopGenres(_db, ids);
            List<GenreResult> topGenres = await Query.GetTopGenresByTime(_db, profile.Id);
            
            var favGenresDict = favGenres.ToDictionary(x => x.Item1, x => x.Item2);
            List<ProfileFavoriteGenres> topPonderado = new();
            foreach (var topGenre in topGenres)
            {
                decimal score = 0;
                if (favGenresDict.ContainsKey(topGenre.Genre))
                {
                    score = (decimal)(topGenre.TiempoTotal * 0.7 +  favGenresDict[topGenre.Genre] * 0.3);
                }
                else
                {
                    score = (decimal)(topGenre.TiempoTotal * 0.7);
                }
                ProfileFavoriteGenres dta = new ProfileFavoriteGenres
                {
                    ProfileId = profile.Id,
                    Genre = topGenre.Genre,
                    Score = score
                };

                topPonderado.Add(dta);
            }
            topPonderado = topPonderado
                .OrderByDescending(x => x.Score)
                .ToList();
            
            
            await _db.AddRangeAsync(topPonderado);
            await _db.SaveChangesAsync();

            data.SetSuccess(true);
            data.SetDataList(gamesToSave);
            return data;
        }
        catch (Exception ex)
        {
            data.SetError(ex.Message);
            data.SetSuccess(false);
            return data;
        }
    }
    
        public async Task<BibliotecaResult> GetBibliotecaByProfile(LinkSteamDTO dto)
    {
        BibliotecaResult data = new BibliotecaResult();

        try
        {
            List<Biblioteca> list = await Query.GetBibliotecaByProfileAsync(_db, dto.ProfileId);
            data.SetSuccess(true);
            data.SetDataList(list);
            return data;
        }
        catch (Exception ex)
        {
            data.SetError(ex.Message);
            data.SetSuccess(false);
            return data;
        }
    }

    private string ExtractSteamId(string steamLink)
    {
        if (string.IsNullOrEmpty(steamLink)) return null;

        try
        {
            Uri uri = new Uri(steamLink);
            string[] segments = uri.Segments;
            return segments.Last().TrimEnd('/');
        }
        catch
        {
            return null;
        }
    }
}