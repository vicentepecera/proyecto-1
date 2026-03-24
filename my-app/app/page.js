"use client";

import HeaderMenu from "@/components/HeaderMenu";
import MenuContent from "@/components/MenuContent";

export default function Home() {

  return (
<div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">      
      {/* Header con menú */}
      <HeaderMenu />

      {/* Contenido principal */}
      <MenuContent />
    </div>
  );
}