// Endpoints/GamesEndpoint.cs
using MyBackend.DTO;
using MyBackend.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MyBackend.Endpoints
{
    public class SteamLibraryEndpoint : IEndpoint
    {
        public void MapEndpoints(WebApplication app)
        {
            app.MapPost("/api/link-steam", async ( HttpContext httpContext, [FromBody] LinkSteamDTO dto) =>
                {
                    SteamLibraryController controller = httpContext.RequestServices .GetRequiredService<SteamLibraryController>();
                    var result = await controller.LinkSteamAccount(dto);
                    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
                })
                .WithName("LinkSteamLibrary");

            app.MapPost("/api/get-biblioteca", async ( HttpContext httpContext, [FromBody] LinkSteamDTO dto) =>
                {
                    SteamLibraryController controller = httpContext.RequestServices .GetRequiredService<SteamLibraryController>();
                    var result = await controller.GetBibliotecaByProfile(dto);
                    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
                })
                .WithName("GetLibrary");
        }
    }
}