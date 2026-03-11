using Microsoft.AspNetCore.Mvc;
using MyBackend.Data;
using MyBackend.DTO;
using MyBackend.DTO.Results;
using MyBackend.Data;
using MyBackend.Models;

namespace MyBackend.Controllers;

public class GamesController: ControllerBase
{
    private readonly AppDbContext _db;

    public GamesController(AppDbContext db)
    {
        _db = db;
    }
    public async Task<GamesResult> GetGames(GameDTO dto)
    {
        GamesResult data = new GamesResult();
        try
        {
            List<Game> games = await Query.GetGamesByNameContainsAsync(_db,dto.Game);
            if (games.Count == 0)
            {
                data.SetError("No se encontraron juegos asociados al texto");
                data.SetSuccess(false);
                return data;
            }
            data.SetDataList(games);
            data.SetSuccess(true);
            return data;
        }
        catch (Exception ex)
        {
            data.SetError(ex.Message);
            data.SetSuccess(false);
            return data;
        }
    }
    
    public async Task<GamesResult> GetGamesByBiblioteca(ProfileDTO dto)
    {
        GamesResult data = new GamesResult();
        try
        {
            List<Biblioteca> biblioteca = await Query.GetBibliotecaByProfileAsync(_db,dto.Id!.Value); 
            List<int> ids = biblioteca.Select(b => b.AppId) .ToList();
            
            List<Game> games = await Query.GetGameByBiblioteca(_db,ids);
            if (games.Count == 0)
            {
                data.SetError("No se encontraron juegos");
                data.SetSuccess(false);
                return data;
            }
            data.SetDataList(games);
            data.SetSuccess(true);
            return data;
        }
        catch (Exception ex)
        {
            data.SetError(ex.Message);
            data.SetSuccess(false);
            return data;
        }
    }
}