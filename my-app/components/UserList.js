"use client";

export default function UserList({ usuarios, seleccionarUsuario }) {

  if (!usuarios || usuarios.length === 0) return null;

  return (
    <div className="w-[600px] flex flex-col gap-4">

      {usuarios.map((u) => (

        <div
          key={u.id}
          onClick={() => seleccionarUsuario(u)}
          className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
        >

          <img
            src={u.fotoPerfil}
            alt={u.nombre}
            className="w-14 h-14 rounded-full object-cover"
          />

          <p className="font-bold">
            {u.nombre}
          </p>

        </div>

      ))}

    </div>
  );
}