using Microsoft.AspNetCore.Mvc;
using MyBackend.DTO;
using MyBackend.Services;
using MyBackend.Models;

namespace MyBackend.Controllers;

public class AuthController: ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    public async Task<AuthService.AuthResult> Login(UserLoginDTO dto)
    {
        return await _authService.Login(dto.Email, dto.Password);
    }

    public async Task<AuthService.AuthResult> Register(UserRegisterDTO dto)
    {
        return await _authService.Register(dto.Email, dto.Password, dto.Nombre);
    }
}