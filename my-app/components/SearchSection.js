"use client";

import SearchBar from "@/components/SearchBar";
import UserList from "@/components/UserList";
import GameList from "@/components/GameList";

export default function SearchSection({
  modoBusqueda,
  dicModoBusqueda,
  usuariosFiltrados,
  juegosFiltrados,
  handleSearch,
  seleccionarUsuario,
  usuarioSeleccionado
}) {

  if (modoBusqueda === 0) return null;

  return (
    <div
      className={`
        absolute
        top-16
        left-1/2
        -translate-x-1/2
        flex flex-col
        items-center
        gap-10
        z-20
        transition-transform duration-500
        animate-fadeIn
        ${usuarioSeleccionado ? "-translate-x-[700px]" : ""}
      `}
    >

      <h1 className="text-4xl font-bold">
        Buscar personas que juegen...
      </h1>

      <SearchBar
        texto={"Buscar..."}
        width="600px"
        onSearch={handleSearch}
      />

      {modoBusqueda !== 2 && (
        <UserList
          usuarios={usuariosFiltrados}
          seleccionarUsuario={seleccionarUsuario}
        />
      )}

      {modoBusqueda === 2 && (
        <GameList juegos={juegosFiltrados} />
      )}

    </div>
  );
}