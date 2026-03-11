using Microsoft.AspNetCore.Mvc;
using MyBackend.Controllers;
using MyBackend.DTO;

namespace MyBackend.Endpoints.Auth;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        // Endpoint de login
        app.MapPost("/api/auth/login", async ([FromServices] AuthController controller, [FromBody] UserLoginDTO dto) =>
        {
            var result = await controller.Login(dto);
            return Results.Ok(result); // envía { success, user, error }
        });

        // Endpoint de registro
        app.MapPost("/api/auth/register", async ([FromServices] AuthController controller, [FromBody] UserRegisterDTO dto) =>
        {
            var result = await controller.Register(dto);
            return Results.Ok(result); // envía { success, user, error }
        });
    }
}