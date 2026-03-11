// Endpoints/GamesEndpoint.cs
using MyBackend.DTO;
using MyBackend.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MyBackend.Endpoints
{
    public class GamesEndpoint : IEndpoint
    {
        public void MapEndpoints(WebApplication app)
        {
            app.MapPost("/api/games", async ( HttpContext httpContext, [FromBody] GameDTO dto) =>
            {
                    GamesController controller = httpContext.RequestServices .GetRequiredService<GamesController>();
                    var result = await controller.GetGames(dto);
                    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
            })
            .WithName("SearchGames");
            
            app.MapPost("/api/games-by-biblioteca", async ( HttpContext httpContext, [FromBody] ProfileDTO dto) =>
                {
                    GamesController controller = httpContext.RequestServices .GetRequiredService<GamesController>();
                    var result = await controller.GetGamesByBiblioteca(dto);
                    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
                })
                .WithName("SearchGamesByLibrary");
            
        }
    }
}