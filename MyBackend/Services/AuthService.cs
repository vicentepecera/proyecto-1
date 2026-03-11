using MyBackend.Data;
using MyBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace MyBackend.Services;

public class AuthService
{
    private readonly AppDbContext _db;

    public AuthService(AppDbContext db)
    {
        _db = db;
    }

    // Clase para estandarizar la respuesta
    public class AuthResult
    {
        public bool Success { get; set; }
        public User? User { get; set; }
        public string? Error { get; set; }
    }

    public async Task<AuthResult> Login(string email, string password)
    {
        try
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
            if (user == null) return new AuthResult { Success = false, Error = "Correo no registrado" };

            using var sha = SHA256.Create();
            var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(password));

            if (!hash.SequenceEqual(user.PasswordHash))
                return new AuthResult { Success = false, Error = "Contraseña incorrecta" };

            return new AuthResult { Success = true, User = user };
        }
        catch (Exception ex)
        {
            return new AuthResult { Success = false, Error = $"Error en backend: {ex.Message}" };
        }
    }

    public async Task<AuthResult> Register(string email, string password, string nombre)
    {
        try
        {
            // Verificar si ya existe
            if (await _db.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower()))
                return new AuthResult { Success = false, Error = "El usuario ya existe" };

            using var sha = SHA256.Create();
            var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(password));

            var user = new User
            {
                Email = email,
                PasswordHash = hash,
                Nombre = nombre
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var userProfile = new UserProfile
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Nombre = nombre,
                FotoPerfil = user.FotoPerfil,
                FechaCreacion = DateTime.UtcNow,
                UltimaActualizacion = DateTime.UtcNow,
            };
            _db.UserProfiles.Add(userProfile);
            await _db.SaveChangesAsync();
            
            return new AuthResult { Success = true, User = user };
        }
        catch (Exception ex)
        {
            return new AuthResult { Success = false, Error = $"Error en backend: {ex.Message}" };
        }
    }
}