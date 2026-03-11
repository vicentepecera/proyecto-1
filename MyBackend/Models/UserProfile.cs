using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBackend.Models
{
    public class UserProfile
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid(); // GUID como PK

        [Required]
        [ForeignKey("User")]
        public Guid UserId { get; set; } // FK hacia Users
        public virtual User User { get; set; } // Navegación hacia User

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; }

        [MaxLength(10000)] // Si quieres permitir base64 grande
        public string FotoPerfil { get; set; }

        public string? Bio { get; set; }

        public DateTime? FechaNacimiento { get; set; }

        [MaxLength(50)]
        public string? Nacionalidad { get; set; }

        [MaxLength(255)]
        public string? SteamLink { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

        public DateTime UltimaActualizacion { get; set; } = DateTime.UtcNow;
    }
}