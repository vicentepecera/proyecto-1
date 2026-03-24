'use client';

import { useState } from "react";
import ButtonComponent from "./ButtonComponent";

export default function DescriptionModal({ game, onClose }) {
  const [translated, setTranslated] = useState(false);
  const [description, setDescription] = useState(game.aboutTheGame || "Sin descripción disponible.");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!game.aboutTheGame) return;

    setLoading(true);
    try {
      // Aquí iría la llamada a tu API de traducción si la tuvieras
      // Por ahora solo simulamos la traducción cambiando el estado
      setDescription(game.aboutTheGame + " (traducido)"); // Simulación
      setTranslated(true);
    } catch (err) {
      console.error("Error traduciendo:", err);
    } finally {
      setLoading(false);
    }
  };

  // Dividir el texto por bullets "•" y renderizar cada uno como párrafo
  const renderParagraphs = (text) => {
    return text.split("•").map((part, index) => {
      const trimmed = part.trim();
      if (!trimmed) return null; // saltar bloques vacíos
      return (
        <p key={index}>
          {index !== 0 ? "• " : ""}
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white rounded-xl p-6 max-w-xl w-full relative max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-blue-400 mb-4">
          {game.name} - Descripción
        </h3>

        <div className="text-gray-300 mb-6 flex flex-col gap-3">
          {renderParagraphs(description)}
        </div>

        <div className="flex justify-between">
          <ButtonComponent
            texto="Cerrar"
            onClick={onClose}
            width="100px"
            height="35px"
          />
          <ButtonComponent
            texto={translated ? "Ver original" : "Traducir"}
            onClick={() => {
              if (translated) {
                setDescription(game.aboutTheGame);
                setTranslated(false);
              } else {
                handleTranslate();
              }
            }}
            width="120px"
            height="35px"
          />
        </div>

        {loading && <p className="text-gray-400 mt-2 text-right">Traduciendo...</p>}
      </div>
    </div>
  );
}