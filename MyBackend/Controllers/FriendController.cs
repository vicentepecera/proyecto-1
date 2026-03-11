using Microsoft.AspNetCore.Mvc;
using MyBackend.Data;
using MyBackend.DTO;
using MyBackend.DTO.Results;
using MyBackend.Data;
using MyBackend.Models;

namespace MyBackend.Controllers;

public class FriendController: ControllerBase
{
    private readonly AppDbContext _db;

    public FriendController(AppDbContext db)
    {
        _db = db;
    }
    public async Task<ProfileResult> GetFriendAfin(FriendSearcherDTO dto)
    {
        ProfileResult data = new ProfileResult();
        try
        {
            UserProfile profile = await Query.GetProfileByUserAsync(_db, dto.UserId);
            if (profile == null)
            {
                data.SetError("No existe perfil asociado al usuario");
                data.SetSuccess(false);
                return data;
            }
            List<(Guid profileId, decimal affinity)> amigosId = await Query.GetTopFriends(_db, profile.Id);
            List<Guid> ids = amigosId .Select(x => x.profileId) .ToList();
            List<UserProfile> amigos = await Query.GetProfilesByIds(_db, ids);
            
            List<UserProfile>  amigosOrdenados = amigos .OrderBy(p => ids.IndexOf(p.Id)) .ToList();
 
            data.SetDataList(amigosOrdenados);
            data.SetSuccess(true);
            return data;
        }
        catch (Exception ex)
        {
            data.SetError(ex.Message);
            data.SetSuccess(false);
            return data;
        }
    }
}