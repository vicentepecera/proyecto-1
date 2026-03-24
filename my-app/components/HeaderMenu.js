import { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import LogoSteamAmigos from "./LogoSteamAmigos";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import {
  Compass,
  Users,
  Sparkles,
  Heart,
  Bell
} from "lucide-react";

export default function HeaderMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Funciones que irán en el menú lateral
  const funciones = [
    { 
      titulo: "Explorar juegos",
      descripcion: "Descubre juegos nuevos y populares...",
      href: "/",
      icon: Compass
    },
    { 
      titulo: "Conectar con amigos",
      descripcion: "Agrega amigos, comparte logros...",
      href: "/search-friends",
      icon: Users
    },
    { 
      titulo: "Recomendaciones personalizadas",
      descripcion: "Recibe sugerencias de juegos...",
      href: "/recommendations",
      icon: Sparkles
    },
    { 
      titulo: "Listas de favoritos",
      descripcion: "Crea listas de tus juegos favoritos...",
      href: "/favorites",
      icon: Heart
    },
    { 
      titulo: "Notificaciones y eventos",
      descripcion: "Mantente al día con eventos, ofertas...",
      href: "/events",
      icon: Bell
    }
  ];

  return (
    <header
      className="w-full text-white py-4 px-8 shadow-md flex items-center justify-between relative"
      style={{ backgroundColor: "#01081F" }}
    >
      <div className="flex items-center gap-2">
        <button className="p-2" onClick={() => setMenuOpen(true)}>
          <FaBars size={20} />
        </button>
        <LogoSteamAmigos />
      </div>

      <nav className="hidden md:flex gap-6 items-center">
        {!user ? (
          <>
            <a href="/login" className="hover:underline text-white">Ingresar</a>
            <a href="/sign-up" className="hover:underline text-white">Registrate</a>
          </>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 focus:outline-none"
            >
              <img
                src={`${user.fotoPerfil}`}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
              <a
                href={`/profile/${user.id}`} // Cambia esta URL a la que corresponda para editar el perfil
                className="block px-4 py-2 text-white hover:bg-gray-700 rounded"
              >
                Editar perfil
              </a>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded mt-1"
              >
                Logout
              </button>
            </div>
          )}
          </div>
        )}
      </nav>

      {/* Pasamos las funciones al Sidebar */}
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} funciones={funciones} />
    </header>
  );
}