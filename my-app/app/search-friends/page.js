"use client";

import { useState } from "react";
import HeaderMenu from "@/components/HeaderMenu";
import { useAuth } from "@/context/AuthContext";
import { api } from "../api";

import SearchModeCards from "@/components/SearchModeCards";
import SearchSection from "@/components/SearchSection";
import UserProfilePanel from "@/components/UserProfilePanel";

export default function SearchFriendsPage() {

  const [modoBusqueda, setModoBusqueda] = useState(0);

  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  const [juegosFiltrados, setJuegosFiltrados] = useState([]);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [juegoMasJugado, setJuegoMasJugado] = useState(null);

  const { user } = useAuth();

  const dicModoBusqueda = {
    0: "Manual",
    1: "Afín",
    2: "Esotilin"
  };

  const getMostPlayed = (myGames) => {
    if (!myGames || myGames.length === 0) return null;

    const sortedGames = [...myGames].sort(
      (a, b) => b.playtimeMinutes - a.playtimeMinutes
    );

    return sortedGames[0];
  };

  const seleccionarModo = async (modo) => {

    setModoBusqueda(modo);

    try {

      // FAN DE JUEGO
      if (modo === 2) {

        return;
      }

      // OTROS MODOS
      const payload = {
        userId: user.id,
        searcherId: modo
      };

      const res = await api.post("/api/friendsSearcher", payload);
      setUsuarios(res.dataList);
      setUsuariosFiltrados(res.dataList);

    } catch (error) {
      console.error("Error buscando:", error);
    }
  };

  const handleSearch = async (text) => {

    if (modoBusqueda === 2) {

        const payload = {
            game: text
        };

        const res = await api.post("/api/games", payload);

        setJuegosFiltrados(res.dataList);

        console.log(res.dataList)

    } else {

      const filtrados = usuarios.filter((u) =>
        u.nombre.toLowerCase().includes(text.toLowerCase())
      );

      setUsuariosFiltrados(filtrados);

    }
  };

  const seleccionarUsuario = async (usuario) => {

    setUsuarioSeleccionado(usuario);

    try {

      const payload = {
        profileId: usuario.id
      };

      const res = await api.post("/api/get-biblioteca", payload);

      const juegos = res.dataList;

      if (juegos && juegos.length > 0) {

        const masJugado = getMostPlayed(juegos);
        setJuegoMasJugado(masJugado);

      }

    } catch (error) {
      console.error("Error obteniendo biblioteca:", error);
    }
  };

  return (

    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">

      <HeaderMenu />

      <div className="flex flex-1 justify-center items-center relative overflow-hidden">

        <SearchModeCards
          seleccionarModo={seleccionarModo}
          modoBusqueda={modoBusqueda}
        />

        <SearchSection
          modoBusqueda={modoBusqueda}
          dicModoBusqueda={dicModoBusqueda}
          usuariosFiltrados={usuariosFiltrados}
          juegosFiltrados={juegosFiltrados}
          handleSearch={handleSearch}
          seleccionarUsuario={seleccionarUsuario}
          usuarioSeleccionado={usuarioSeleccionado}
        />

        <UserProfilePanel
          usuario={usuarioSeleccionado}
          juegoMasJugado={juegoMasJugado}
          cerrar={() => setUsuarioSeleccionado(null)}
        />

      </div>

    </div>

  );
}