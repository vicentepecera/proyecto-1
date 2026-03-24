"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ menuOpen, setMenuOpen, funciones }) {

  const pathname = usePathname();

  return (
    <>
      {/* OVERLAY */}

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white 
        shadow-2xl transform transition-transform duration-300 z-50
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        <div className="p-6 flex flex-col gap-6 h-full">

          {/* HEADER */}

          <div className="flex justify-between items-center border-b border-gray-700 pb-4">

            <h2 className="text-2xl font-bold text-blue-400">
              Menú
            </h2>

            <button
              className="text-gray-400 hover:text-white text-2xl transition"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

          </div>

          {/* LINKS */}

          <div className="flex flex-col gap-2">

            {funciones.map((funcion, index) => {

              const Icon = funcion.icon;

              const activo = pathname === funcion.href;

              return (

                <Link
                  key={index}
                  href={funcion.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-4 p-3 rounded-lg transition group
                  ${
                    activo
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >

                  {/* ICON */}

                  <div
                    className={`transition
                    ${
                      activo
                        ? "text-white"
                        : "text-blue-400 group-hover:text-blue-300"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  {/* TEXT */}

                  <span className="font-semibold">
                    {funcion.titulo}
                  </span>

                </Link>

              );

            })}

          </div>

          {/* FOOTER */}

          <div className="mt-auto text-sm text-gray-500 text-center pt-6 border-t border-gray-700">
            Tilin Corporation
          </div>

        </div>

      </div>
    </>
  );
}