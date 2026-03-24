"use client";

export default function GameList({ juegos }) {
  if (!juegos || juegos.length === 0) return null;

  return (
    <div className="w-[600px] max-h-[400px] flex flex-col gap-4 overflow-y-auto pr-2">

      {juegos.map((juego) => (
        <div
          key={juego.appID}
          className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
        >
          <img
            src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${juego.appID}/header.jpg`}
            className="w-28 h-14 rounded object-cover"
          />

          <p className="font-bold">
            {juego.name}
          </p>
        </div>
      ))}

    </div>
  );
}