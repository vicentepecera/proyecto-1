'use client';

import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";


export default function EditProfileModal({ profile, onClose, onSave }) {
  const [nombre, setNombre] = useState(profile.nombre || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    profile.fechaNacimiento ? profile.fechaNacimiento.split("T")[0] : ""
  );
  const [nacionalidad, setNacionalidad] = useState(profile.nacionalidad || "");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(profile.fotoPerfil || "/default-avatar.png"); 
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth(); // asumimos que tu AuthContext tiene setUser

  // Convierte un File a Base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(""); // Si no hay archivo, devolver vacío
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        reject(new Error("Solo se permiten archivos PNG o JPG"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // data:image/png;base64,...
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Solo se permiten archivos PNG o JPG");
      return;
    }

    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  // Dentro de tu EditProfileModal.js
  const handleSave = async () => {
    setLoading(true);
    try {
      let fotoBase64 = foto ? await fileToBase64(foto) : profile.fotoPerfil;

      const updatedData = {
        ...profile,
        fotoPerfil: fotoBase64,
        nombre,
        bio,
        fechaNacimiento,
        nacionalidad,
      };

      await onSave(updatedData);

      // Actualiza el estado global del user
      setUser((prev) => prev ? { ...prev, fotoPerfil: fotoBase64 } : prev);

      Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: err.message || "Intenta de nuevo",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-8 w-[500px] flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-blue-400">Editar perfil</h2>

        {/* FOTO DE PERFIL */}
        <div className="flex flex-col items-center gap-2 relative">
          <img
            src={preview}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-gray-300 hover:text-blue-400 flex items-center gap-1 mt-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 13v7h7l11-11-7-7L4 13z" />
            </svg>
            Editar
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* CAMPOS DE TEXTO */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col">
            <label className="text-gray-300 font-semibold mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Nombre"
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 font-semibold mb-1">Biografía</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="Biografía"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 font-semibold mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 font-semibold mb-1">Nacionalidad</label>
            <input
              type="text"
              value={nacionalidad}
              onChange={(e) => setNacionalidad(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="Nacionalidad"
            />
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-4 mt-4">
          <ButtonComponent
            texto="Cancelar"
            width="120px"
            height="40px"
            onClick={onClose}
          />
          <ButtonComponent
            texto={loading ? "Guardando..." : "Guardar"}
            width="120px"
            height="40px"
            color="bg-blue-600"
            hoverColor="bg-blue-500"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}