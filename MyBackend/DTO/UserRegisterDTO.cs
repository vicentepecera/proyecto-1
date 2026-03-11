namespace MyBackend.DTO;

public class UserRegisterDTO
{
    public string Email { get; set; } = null!;
    
    public string Password { get; set; } = null!;
    
    public int Role { get; set; } = 1;
    
    public string? Nombre { get; set; }
    
}