using Microsoft.EntityFrameworkCore;

namespace MyBackend.Models;

[Keyless]
public class GenreResult
{
    public string Genre { get; set; }
    public int TiempoTotal { get; set; }
}