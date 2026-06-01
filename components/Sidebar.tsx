"use client";

import {
  Plus,
  Settings,
  BarChart3,
  LogOut,
  Landmark
} from "lucide-react";

export default function Sidebar({ onConfig, onLogout, onModal }) {

  return (
    <div className="w-[80px] h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col items-center justify-between py-6">

      {/* TOPO */}
      <div className="flex flex-col items-center gap-4">

        {/*Img logo*/}
        <Landmark size={50} className="text-green-500 mb-10" />

        {/* BOTÃO + */}
        <button
          className="
            w-14 h-14
            rounded-full
            bg-green-500
            hover:bg-green-600
            text-white
            flex items-center justify-center
            transition-all
          "
          onClick={onModal}
        >
          <Plus size={28} />
        </button>

        {/* CONFIG */}
        <button
          onClick={onConfig}
          className="
            w-14 h-14
            rounded-2xl
            bg-zinc-800
            hover:bg-zinc-700
            text-white
            flex items-center justify-center
            transition-all
          "
        >
          <Settings size={24} />
        </button>

        {/* GRÁFICO */}
        <button
          className="
            w-14 h-14
            rounded-2xl
            bg-zinc-800
            hover:bg-zinc-700
            text-white
            flex items-center justify-center
            transition-all
          "
        >
          <BarChart3 size={24} />
        </button>

      </div>

      {/* LOGOUT */}
      <button
        onClick={onLogout}
        className="
          w-14 h-14
          rounded-2xl
          bg-red-500/20
          hover:bg-red-500
          text-red-400
          hover:text-white
          flex items-center justify-center
          transition-all
          mb-10
        "
      >
        <LogOut size={24} />
      </button>

    </div>
  );
}