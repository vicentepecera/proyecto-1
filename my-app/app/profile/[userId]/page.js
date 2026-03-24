'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeaderMenu from "@/components/HeaderMenu";
import { api } from "@/app/api";
import ButtonComponent from "@/components/ButtonComponent";
import EditProfileModal from "@/components/EditProfileModal";
import SteamStats from "@/components/SteamStats";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {

  const params = useParams();
  const userId = params.userId;

  const [profile, setProfile] = useState(null);
  const [steamUrl, setSteamUrl] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [steamModalOpen, setSteamModalOpen] = useState(false);
  const [myGames, setMyGames] = useState([]);
  const [myGamesDetail, setMyGamesDetail] = useState([]);

  // Perfil logeado 
  const { user } = useAuth();
const isMyProfile = user?.id === userId;

  const ConnectSteam = async (steamUrl) => {

    try {

      const payload = {
        steamUrl: steamUrl,
        profileId: profile.id
      };

      const res = await api.post("/api/link-steam", payload);

      setMyGames(res.dataList || []);
      setSteamModalOpen(false);

      Swal.fire({
        title: 'Vinculación exitosa!',
        icon: 'success',
        confirmButtonColor: "#3B82F6",
        background: "#2D3748",
        color: "#fff"
      });

    } catch (err) {

      Swal.fire({
        title: 'Error!',
        text: 'Tu biblioteca debe ser pública.',
        icon: 'error',
        confirmButtonColor: "#F87171",
        background: "#2D3748",
        color: "#fff"
      });

    }

  };

  const UpdateProfile = async (updatedData) => {

    try {

      const payload = {
        id: profile.id,
        fotoPerfil: updatedData.fotoPerfil,
        bio: updatedData.bio,
        fechaNacimiento: updatedData.fechaNacimiento || null,
        nacionalidad: updatedData.nacionalidad
      };

      const res = await api.post("/api/update-profile", payload);

      setProfile(res.dataList[0]);
      setEditModalOpen(false);

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    if (!userId) return;

    async function fetchProfile() {

      const res = await api.post("/api/profile", { userId });
      const p = res.dataList[0];
      setProfile(p);
      setSteamUrl(p.steamUrl || "");

    }

    fetchProfile();

  }, [userId]);

  useEffect(() => {
    if (!profile) return;
    if (profile.steamLink == null || profile.steamLink === "") return;
    
    async function fetch() {
      const payload = {
        steamUrl: profile.steamLink,
        profileId: profile.id
      };
      const res = await api.post("/api/get-biblioteca",payload);
      setMyGames(res.dataList);

       const payload1 = {
         userId: userId,
         id: profile.id
       };

      const res1 = await api.post("/api/games-by-biblioteca",payload1);
      setMyGamesDetail(res1.dataList);
    }

    fetch();
  }, [profile])

  const handleSaveSteamUrl = () => {
    setProfile({ ...profile, steamUrl });
    ConnectSteam(steamUrl);
  };

  if (!profile) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
        <HeaderMenu />
        <main className="flex-1 flex items-center justify-center">
          <p>Cargando perfil...</p>
        </main>
      </div>
    );

  }

  return (

    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">

      <HeaderMenu />

      <main className="flex flex-1 p-8 gap-6">

        {/* PERFIL */}

        <div className="w-2/3 flex flex-col gap-6">

          <div className="bg-gray-800 rounded-xl shadow-lg p-8 flex gap-8 items-center">

            <img
              src={profile.fotoPerfil || "/default-avatar.png"}
              className="w-48 h-48 rounded-full border-4 border-blue-500 object-cover"
            />

            <div className="flex flex-col gap-3">

              <h1 className="text-4xl font-bold text-blue-400">
                {profile.nombre}
              </h1>

              <p className="text-gray-300">
                {profile.bio || "Sin descripción"}
              </p>

              <p className="text-gray-400">
                Nacionalidad: {profile.nacionalidad || "No definida"}
              </p>

              {isMyProfile && (<ButtonComponent
                texto="Editar perfil"
                width="150px"
                color="bg-blue-600"
                hoverColor="bg-blue-500"
                onClick={() => setEditModalOpen(true)}
              />)}

            </div>

          </div>

        </div>

        {/* STEAM */}

        <div className="w-1/3 relative">

          <div className="bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col relative overflow-hidden">

            <SteamStats
              profile={profile}
              myGames={myGames}
              myGamesDetail={myGamesDetail}
              steamUrl={steamUrl}
              setSteamUrl={setSteamUrl}
              steamModalOpen={steamModalOpen}
              setSteamModalOpen={setSteamModalOpen}
              handleSaveSteamUrl={handleSaveSteamUrl}
              isMyProfile = {isMyProfile}
            />

          </div>

        </div>

      </main>

      {editModalOpen && (

        <EditProfileModal
          profile={profile}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedData) =>
            UpdateProfile({ ...profile, ...updatedData })
          }
        />

      )}

    </div>

  );

}