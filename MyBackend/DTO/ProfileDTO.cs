namespace MyBackend.DTO;

public class ProfileDTO
{
    public Guid UserId { get; set; }
    
    public Guid? Id { get; set; }
}

public class UpdateProfileDTO
{
    public Guid Id { get; set; }
    
    public string FotoPerfil { get; set; }

    public string? Bio { get; set; }

    public DateTime? FechaNacimiento { get; set; }

    public string? Nacionalidad { get; set; }
}