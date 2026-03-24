"use client";

import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import AnimatedText from "./AnimatedText";
import ButtonComponent from "./ButtonComponent";
import { useState } from "react";
import { api } from "@/app/api";
import DescriptionModal from "./DescriptionModal";

export default function MenuContent() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 5; // 5 juegos por página

  const searchGames = async (searchText) => {
    if (!searchText.trim()) return;

    setLoading(true);
    setError("");
    setGames([]);
    setSelectedGame(null);
    setCurrentPage(1);

    try {
      const response = await api.post("/api/games", { game: searchText });
      setGames(Array.isArray(response.dataList) ? response.dataList : []);
    } catch (err) {
      console.log(err);
      setError("Error buscando juegos");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentGames = games.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < Math.ceil(games.length / itemsPerPage))
      setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-start gap-12 p-8 mt-4 w-full">
      {!user ? (
        <AnimatedText
          texto="¡Crea tu cuenta y comienza a explorar!"
          subtitulo="Regístrate ahora y accede a todas las funciones"
          href="/sign-up"
          textSize="text-9xl"
          subTextSize="text-3xl"
          hoverScale={true}
        />
      ) : (
        <div className="w-full flex flex-col md:flex-row gap-8 h-[700px]">
          {/* Columna izquierda - lista de juegos */}
          <div className="flex-1 flex flex-col h-full">
            <div className="mb-4">
              <SearchBar
                texto="Comienza buscando un juego..."
                width="100%"
                height="50px"
                onSearch={searchGames}
              />
            </div>

            {/* Contenedor de lista + paginación con altura fija */}
            <div className="flex-1 flex flex-col justify-between h-full">
              {/* Lista con scroll si hay muchos */}
              <div className="flex-1 overflow-y-auto">
                {games.length > 0 ? (
                  <ul className="flex flex-col gap-4">
                    {currentGames.map((game) => (
                      <li
                        key={game.appID}
                        className={`flex items-center gap-4 bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer ${
                          selectedGame?.appID === game.appID
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                        onClick={() => handleSelectGame(game)}
                      >
                        <img
                          src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appID}/header.jpg`}
                          alt={game.name}
                          className="w-40 h-20 object-cover rounded"
                        />
                        <span className="text-xl text-white font-semibold truncate">
                          {game.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !loading && (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                      No se encontraron juegos.
                    </div>
                  )
                )}
              </div>

              {/* Paginación fija siempre abajo */}
              <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-700">
                <ButtonComponent
                  texto="Anterior"
                  onClick={prevPage}
                  width="120px"
                  height="40px"
                  disabled={currentPage === 1}
                />
                <span className="text-white font-semibold flex items-center">
                  Página {currentPage} de {Math.ceil(games.length / itemsPerPage)}
                </span>
                <ButtonComponent
                  texto="Siguiente"
                  onClick={nextPage}
                  width="120px"
                  height="40px"
                  disabled={currentPage === Math.ceil(games.length / itemsPerPage)}
                />
              </div>
            </div>
          </div>

          {/* Columna derecha - panel de detalle con altura fija */}
          <div className="w-full md:w-1/3 bg-black/80 text-white rounded-xl p-6 shadow-2xl flex flex-col gap-6 h-full">
            {selectedGame ? (
              <>
                <h3 className="text-3xl font-bold text-blue-400">{selectedGame.name}</h3>
                <img
                  src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${selectedGame.appID}/header.jpg`}
                  alt={selectedGame.name}
                  className="w-full h-60 object-cover rounded"
                />
                <div className="flex-1 overflow-y-auto">
                  <p className="text-gray-300 mt-2">
                    <strong>Precio:</strong> {selectedGame.price}$
                  </p>
                  <p className="text-gray-300 mt-2">
                    <strong>Géneros:</strong> {selectedGame.genres}
                  </p>
                  <p className="text-gray-300 mt-2">
                    <strong>Desarrolladores:</strong> {selectedGame.developers}
                  </p>
                </div>

                <ButtonComponent
                  texto="Ver descripción"
                  onClick={() => setShowModal(true)}
                  width="150px"
                  height="40px"
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-300">Selecciona un juego para ver detalles.</p>
              </div>
            )}
          </div>

          {/* Modal de descripción */}
            {showModal && selectedGame && (
              <DescriptionModal
                game={selectedGame}
                onClose={() => setShowModal(false)}
              />
            )}
        </div>
      )}
    </main>
  );
}