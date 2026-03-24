"use client";

import ButtonComponent from "@/components/ButtonComponent";

export default function SteamStats({
  profile,
  myGames,
  myGamesDetail,
  steamUrl,
  setSteamUrl,
  steamModalOpen,
  setSteamModalOpen,
  handleSaveSteamUrl,
  isMyProfile
}) {

  const totalMinutes = myGames?.reduce(
    (total, game) => total + (game.playtimeMinutes || 0),
    0
  ) || 0;

  const totalHours = Math.floor(totalMinutes / 60);

  const getMostPlayed = () => {
    if (!myGames || myGames.length === 0) return [];

    const sortedGames = [...myGames].sort(
      (a, b) => b.playtimeMinutes - a.playtimeMinutes
    );

    return sortedGames.slice(0, 3);
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-blue-400 mb-6">
        Estadísticas Steam
      </h2>

      {profile.steamLink ? (

        <div className="flex flex-col gap-6">

          {/* STATS CARDS */}

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-gray-700 rounded-lg p-4 text-center shadow hover:bg-gray-600 transition">
              <p className="text-gray-400 text-sm">Juegos</p>
              <p className="text-2xl font-bold text-white">
                {myGames?.length || 0}
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-center shadow hover:bg-gray-600 transition">
              <p className="text-gray-400 text-sm">Horas jugadas</p>
              <p className="text-2xl font-bold text-white">
                {totalHours}
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-center shadow hover:bg-gray-600 transition">
              <p className="text-gray-400 text-sm">Steam</p>

              <a
                href={profile.steamLink}
                target="_blank"
                className="text-blue-400 text-sm break-all hover:underline"
              >
                Ver perfil
              </a>
            </div>

          </div>

          {/* TOP JUEGOS */}

          <div>

            <h3 className="text-xl font-bold text-blue-400 mb-3">
              Top 3 juegos
            </h3>

            {getMostPlayed().length > 0 ? (

              <div className="flex flex-col gap-3">

                {getMostPlayed().map((game) => (

                  <div
                    key={game.appId}
                    className="flex items-center gap-4 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition"
                  >

                    <img
                      src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appId}/header.jpg`}
                      alt={game.name}
                      className="w-36 h-16 object-cover rounded"
                    />

                    <div className="flex flex-col flex-1">

                      <span className="text-white font-semibold">
                        {game.name}
                      </span>

                      <span className="text-gray-400 text-sm">
                        {Math.floor(game.playtimeMinutes / 60)} horas jugadas
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            ) : (
              <p className="text-gray-400">
                No hay juegos para mostrar
              </p>
            )}

          </div>

          {isMyProfile && (

            <div className="flex justify-end">

              <ButtonComponent
                texto="Cambiar Steam"
                width="160px"
                height="40px"
                color="bg-blue-600"
                hoverColor="bg-blue-500"
                onClick={() => setSteamModalOpen(true)}
              />

            </div>

          )}

        </div>

      ) : (

        <div
          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-20"
          onClick={() => setSteamModalOpen(true)}
        >

          <div className="absolute inset-0 bg-black/70 rounded-xl"></div>

          <div className="z-30 animate-pulse">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2v-9a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zm-3 8V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9zm-2 2h10v9H7v-9z"/>
            </svg>

          </div>

          {isMyProfile && (
            <span className="text-gray-300 font-bold z-30 mt-6 text-center text-lg">
              Conecta tu Steam
            </span>
          )}

        </div>

      )}

      {/* MODAL */}

      {steamModalOpen && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-gray-800 rounded-xl p-8 w-[450px] flex flex-col gap-4 shadow-xl">

            <h2 className="text-2xl font-bold text-blue-400">
              Conectar Steam
            </h2>

            <input
              type="text"
              value={steamUrl}
              onChange={(e) => setSteamUrl(e.target.value)}
              placeholder="https://steamcommunity.com/id/usuario"
              className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            />

            <div className="flex justify-end gap-4 mt-4">

              <ButtonComponent
                texto="Cancelar"
                width="120px"
                height="40px"
                onClick={() => setSteamModalOpen(false)}
              />

              <ButtonComponent
                texto="Guardar"
                width="120px"
                height="40px"
                color="bg-blue-600"
                hoverColor="bg-blue-500"
                onClick={handleSaveSteamUrl}
              />

            </div>

          </div>

        </div>

      )}

    </>
  );
}