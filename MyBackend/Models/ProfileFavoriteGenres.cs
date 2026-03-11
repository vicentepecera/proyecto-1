namespace MyBackend.Models;

public class ProfileFavoriteGenres
{
    public int Id { get; set; }
    
    public Guid ProfileId { get; set; }
    
    public string Genre { get; set; }
    
    public decimal Score { get; set; }
    
}