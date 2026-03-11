// Endpoints/GamesEndpoint.cs
using MyBackend.DTO;
using MyBackend.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MyBackend.Endpoints
{
    public class FreindsEndpoint : IEndpoint
    {
        public void MapEndpoints(WebApplication app)
        {
            app.MapPost("/api/friendsSearcher", async ( HttpContext httpContext, [FromBody] FriendSearcherDTO dto) =>
                {
                    FriendController controller = httpContext.RequestServices .GetRequiredService<FriendController>();
                    var result = await controller.GetFriendAfin(dto);
                    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
                })
                .WithName("SearchFriendsByAfinity");
        }
    }
}