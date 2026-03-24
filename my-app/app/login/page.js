"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";
import { useAuth } from "../../context/AuthContext"; // importar tu AuthContext

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth(); // 👈 usamos el login del contexto

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await login(email, password); // 👈 login vía contexto
    setLoading(false);

    if (res.success) { 
      Swal.fire({
        title: "¡Bienvenido!",
        text: `Usuario: ${res.user.nombre}`,
        icon: "success",
        confirmButtonText: "Continuar",
        timer: 3000,
      }).then(() => {
        router.push("/"); // redirige al home
      });
    } else {
      Swal.fire({
        title: "Error",
        text: res.error,
        icon: "error",
        confirmButtonText: "Reintentar",
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-800 text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Ingresar</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={loading}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}