"use client";

import ButtonComponent from "@/components/ButtonComponent";
import { useRouter } from "next/navigation";

export default function UserProfilePanel({
  usuario,
  juegoMasJugado,
  cerrar
}) {

  const router = useRouter();

  return (
    <div
      className={`
        fixed
        right-0
        top-0
        h-full
        w-[650px]
        bg-gray-900
        border-l border-gray-700
        shadow-2xl
        transition-transform duration-500
        z-30
        ${usuario ? "translate-x-0" : "translate-x-full"}
      `}
    >

      {usuario && (

        <div className="flex flex-col items-center p-10 gap-6">

          <button
            onClick={cerrar}
            className="self-end text-gray-400 hover:text-white"
          >
            ✕
          </button>

          <img
            src={usuario.fotoPerfil}
            className="w-36 h-36 rounded-full object-cover"
          />

          <h2 className="text-3xl font-bold">
            {usuario.nombre}
          </h2>

          {juegoMasJugado && (

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 w-[420px] flex items-center gap-4">

              <img
                src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${juegoMasJugado.appId}/header.jpg`}
                className="w-40 h-20 object-cover rounded-lg"
              />

              <div>

                <p className="text-gray-400 text-sm">
                  Juego más jugado
                </p>

                <p className="text-xl font-semibold text-white">
                  {juegoMasJugado.name}
                </p>

                <p className="text-gray-500 text-sm">
                  {Math.floor(juegoMasJugado.playtimeMinutes / 60)} horas jugadas
                </p>

              </div>

            </div>

          )}

          <div className="flex gap-4">

            <ButtonComponent
              texto="Enviar solicitud"
              onClick={() => console.log("Enviar solicitud")}
              width="200px"
              color="bg-indigo-500"
              hoverColor="bg-indigo-600"
            />

            <ButtonComponent
              texto="Ver perfil"
              onClick={() => router.push(`/profile/${usuario.id}`)}
              width="200px"
              color="bg-gray-700"
              hoverColor="bg-gray-600"
            />

          </div>

        </div>

      )}

    </div>
  );
}