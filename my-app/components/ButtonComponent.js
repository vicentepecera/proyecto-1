"use client";

import { useState } from "react";

export default function ButtonComponent({
  texto = "Botón",
  onClick,
  width = "200px",
  height = "50px",
  color = "bg-gray-800",
  hoverColor = "bg-gray-700",
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`
        flex items-center justify-center
        rounded-lg
        border border-gray-700
        text-white font-semibold
        transition-transform transition-colors duration-200
        ${isHover ? `scale-105 ${hoverColor}` : color}
      `}
      style={{ width, height }}
    >
      {texto}
    </button>
  );
}