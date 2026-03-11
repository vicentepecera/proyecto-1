// Models/Game.cs

using System.ComponentModel.DataAnnotations;

namespace MyBackend.Models
{
    public class Game
    {
        [Key]
        public int AppID { get; set; }
        public string? Name { get; set; }
        public string? AboutTheGame { get; set; }
        public string? HeaderImage { get; set; }
        public string? Developers { get; set; }
        public string? Publishers { get; set; }
        public string? Genres { get; set; }
        public string? Categories { get; set; }
        public string? Tags { get; set; }
        public string? Screenshots { get; set; }
        public string? Movies { get; set; }
        public string? Website { get; set; }
        public string? SupportURL { get; set; }
        public string? SupportEmail { get; set; }
        public string? MetacriticURL { get; set; }
        public string? FullAudioLanguages { get; set; }
        public string? SupportedLanguages { get; set; }
        public string? Reviews { get; set; }
        public string? Notes { get; set; }
        public string? EstimatedOwners { get; set; }
        public string? ReleaseDate { get; set; }
        
        // Propiedades numéricas
        public int? Achievements { get; set; }
        public int? Recommendations { get; set; }
        public int? Positive { get; set; }
        public int? Negative { get; set; }
        public decimal? Price { get; set; }
        public int? MetacriticScore { get; set; }
        public int? UserScore { get; set; }
        public int? RequiredAge { get; set; }
        public int? DiscountDLCCount { get; set; }
        public int? PeakCCU { get; set; }
        public int? AveragePlaytimeForever { get; set; }
        public int? AveragePlaytimeTwoWeeks { get; set; }
        public int? MedianPlaytimeForever { get; set; }
        public int? MedianPlaytimeTwoWeeks { get; set; }
        public string? ScoreRank { get; set; }
        
        // Booleanos
        public string Windows { get; set; }
        public string Mac { get; set; }
        public string Linux { get; set; }
    }
}