"use client";

import AnimatedText from "@/components/AnimatedText";

export default function SearchModeCards({ seleccionarModo, modoBusqueda }) {

  return (
    <div
      className={`
        grid grid-cols-4 gap-12 w-[92%]
        transition-opacity duration-300
        ${modoBusqueda ? "opacity-20 pointer-events-none" : "opacity-100"}
      `}
    >

      <div onClick={() => seleccionarModo(1)} className="card group">
        <div className="card-light" />
        <AnimatedText
          texto="Compañero de juego afín"
          subtitulo="Encuentra a alguien con tus mismos gustos"
          textSize="text-3xl"
          subTextSize="text-lg"
        />
      </div>

      <div onClick={() => seleccionarModo(2)} className="card group">
        <div className="card-light" />
        <AnimatedText
          texto="Alguien fan de un juego"
          subtitulo="Busca personas que jueguen lo mismo"
          textSize="text-3xl"
          subTextSize="text-lg"
        />
      </div>

      <div className="card opacity-50">
        <AnimatedText
          texto="Próximamente"
          subtitulo="Más formas de encontrar compañeros"
          textSize="text-3xl"
          subTextSize="text-lg"
          hoverScale={false}
        />
      </div>

      <div onClick={() => seleccionarModo(0)} className="card group">
        <div className="card-light" />
        <AnimatedText
          texto="Prefiero decidir yo"
          subtitulo="Explora jugadores manualmente"
          textSize="text-3xl"
          subTextSize="text-lg"
        />
      </div>

    </div>
  );
}