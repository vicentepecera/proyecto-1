"use client";

export default function AnimatedText({
  texto,
  subtitulo = "",
  href = "#",
  textSize = "text-9xl",
  subTextSize = "text-3xl",
  hoverScale = true,
}) {
  // Hover opcional
  const hoverClass = hoverScale ? "transition-transform duration-300 hover:scale-105" : "";

  // Contenido principal
  const content = (
    <div className="flex flex-col items-center text-center gap-6">
      {/* Texto principal con gradiente y fuente del sistema moderna */}
      <span
        className={`${textSize} font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent ${hoverClass}`}
        style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
      >
        {texto}
      </span>

      {/* Subtítulo */}
      {subtitulo && (
        <span
          className={`${subTextSize} text-gray-400`}
          style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
        >
          {subtitulo}
        </span>
      )}
    </div>
  );

  // Si hay link
  return href && href !== "#" ? <a href={href}>{content}</a> : content;
}