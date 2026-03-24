import Link from "next/link";

export default function LogoSteamAmigos() {
  return (
    <Link href="/">
      <div className="flex items-center gap-3 cursor-pointer">
        {/* Icono estilo Steam */}
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white rounded-full relative">
            <div className="absolute w-2 h-2 bg-white rounded-full top-1 left-3"></div>
            <div className="absolute w-2 h-2 bg-white rounded-full bottom-1 right-1"></div>
          </div>
        </div>

        {/* Texto */}
        <h1 className="text-white font-bold text-xl">
          Steamigos
        </h1>
      </div>
    </Link>
  );
}