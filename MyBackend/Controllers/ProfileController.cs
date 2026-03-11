using Microsoft.AspNetCore.Mvc;
using MyBackend.Data;
using MyBackend.DTO;
using MyBackend.DTO.Results;
using MyBackend.Data;
using MyBackend.Models;

namespace MyBackend.Controllers;

public class ProfileController: ControllerBase
{
    private readonly AppDbContext _db;

    public ProfileController(AppDbContext db)
    {
        _db = db;
    }
    public async Task<ProfileResult> GetProfile(ProfileDTO dto)
    {
        ProfileResult data = new ProfileResult();
        List<UserProfile> list = new List<UserProfile>();
        try
        {
            var profile = await Query.GetProfileByUserAsync(_db,dto.UserId);
            if (profile == null)
            {
                // En caso que se traspapelen
                profile = await Query.GetProfileAsync(_db, dto.UserId);
                if (profile == null)
                {
                    data.SetError("No existe el perfil buscado");
                    data.SetSuccess(false);
                    return data; 
                }
            } 
            list.Add(profile);
            data.SetDataList(list);
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
    
    public async Task<ProfileResult> UpdateProfile(UpdateProfileDTO dto)
    {
        ProfileResult data = new ProfileResult();
        List<UserProfile> list = new List<UserProfile>();
        try
        {
            UserProfile profile = await Query.GetProfileAsync(_db,dto.Id);
            if (profile == null)
            {
                data.SetError("No existe el perfil buscado");
                data.SetSuccess(false);
                return data;
            } 
            User user = await Query.GetUserAsync(_db, profile.UserId);
            user!.FotoPerfil = dto.FotoPerfil;
            
            profile.Bio = dto.Bio;
            profile.FotoPerfil = dto.FotoPerfil;
            profile.FechaNacimiento = dto.FechaNacimiento;
            profile.Nacionalidad = dto.Nacionalidad;
            
            list.Add(profile);
            
            _db.UserProfiles.Update(profile);
            _db.Users.Update(user);
            
            _db.SaveChangesAsync();
            data.SetDataList(list);
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
    
    public async Task<ProfileResult> GetProfilesByGame(GameUltraDTO dto)
    {
        ProfileResult data = new ProfileResult();
        try
        {
            List<Biblioteca> bibliotecas = await Query.GetBibliotecaByGame(_db,dto.AppID);
            List<Guid> ids = bibliotecas.Select(b => b.ProfileId) .ToList();
            List<UserProfile> profiles = await Query.GetProfilesByIds(_db, ids);
            
            data.SetDataList(profiles);
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