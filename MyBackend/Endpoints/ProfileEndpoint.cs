// Endpoints/GamesEndpoint.cs
using MyBackend.DTO;
using MyBackend.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MyBackend.Endpoints
{
    public class ProfileEndpoint : IEndpoint
    {
        public void MapEndpoints(WebApplication app)
        {
            app.MapPost("/api/profile", async (HttpContext httpContext, [FromBody] ProfileDTO dto) =>
                {
                    ProfileController controller = httpContext.RequestServices.GetRequiredService<ProfileController>();
                    var result = await controller.GetProfile(dto);
                    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
                })
                .WithName("SearchProfile");

            app.MapPost("/api/update-profile", async (HttpContext httpContext, [FromBody] UpdateProfileDTO dto) =>
                {
                    ProfileController controller = httpContext.RequestServices.GetRequiredService<ProfileController>();
                    var result = await controller.UpdateProfile(dto);
                    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
                })
                .WithName("UpdateProfile");
            app.MapPost("/api/profileByGame", async (HttpContext httpContext, [FromBody] GameUltraDTO dto) =>
                {
                    ProfileController controller = httpContext.RequestServices.GetRequiredService<ProfileController>();
                    var result = await controller.GetProfilesByGame(dto);
                    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
                })
                .WithName("SearchProfileByGame");
        }
    }
}