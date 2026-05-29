"use client";

import { useState } from "react";

import {
  Palette,
  User,
  UserPlus,
  X
} from "lucide-react";

import AddUser from "./AddUser";

export default function ConfigPanel({ onClose }) {

  const [tab, setTab] = useState("tema");

  const menu = [
    {
      id: "tema",
      label: "Tema",
      icon: Palette
    },
    {
      id: "perfil",
      label: "Perfil",
      icon: User
    },
    {
      id: "add",
      label: "Add User",
      icon: UserPlus
    }
  ];

  return (
    <div
      className="
        fixed inset-0
        bg-black/50
        backdrop-blur-sm
        flex items-center justify-center
        z-50
      "
    >

      {/* MODAL */}
      <div
        className="
          relative
          w-[900px]
          h-[600px]
          bg-zinc-900
          border border-zinc-800
          rounded-3xl
          overflow-hidden
          flex
          shadow-2xl
        "
      >

      {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="
            absolute
            top-5 right-5
            w-10 h-10
            rounded-xl
            bg-zinc-800
            hover:bg-red-500
            text-white
            flex items-center justify-center
            transition-all
          "
        >
        <X size={20} />
      </button>

        {/* MENU */}
        <div
          className="
            w-[240px]
            bg-zinc-950
            border-r border-zinc-800
            p-5
          "
        >

          <h2 className="text-white text-2xl font-bold mb-8">
            Config
          </h2>

          <div className="flex flex-col gap-3">

            {menu.map((item) => {

              const Icon = item.icon;

              const active = tab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`
                    flex items-center gap-4
                    p-4 rounded-2xl
                    transition-all
                    text-left

                    ${
                      active
                        ? "bg-green-500 text-white"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    }
                  `}
                >

                  <Icon size={20} />

                  <span>
                    {item.label}
                  </span>

                </button>
              );
            })}

          </div>

        </div>

        {/* CONTEÚDO */}
        <div className="flex-1 p-8 overflow-y-auto">

          {tab === "tema" && (

            <div>

              <h1 className="text-white text-3xl font-bold mb-3">
                Tema
              </h1>

              <p className="text-zinc-400 mb-8">
                Escolha o tema do sistema.
              </p>

              <div className="flex gap-5">

                <div
                  className="
                    w-40 h-32
                    rounded-3xl
                    bg-zinc-800
                    border-2 border-green-500
                    cursor-pointer
                  "
                />

                <div
                  className="
                    w-40 h-32
                    rounded-3xl
                    bg-white
                    cursor-pointer
                  "
                />

              </div>

            </div>
          )}

          {tab === "perfil" && (

            <div>

              <h1 className="text-white text-3xl font-bold mb-3">
                Perfil
              </h1>

              <p className="text-zinc-400 mb-8">
                Informações do usuário.
              </p>

              <div className="flex items-center gap-6">

                <div
                  className="
                    w-28 h-28
                    rounded-full
                    bg-zinc-800
                  "
                />

                <button
                  className="
                    bg-green-500
                    hover:bg-green-600
                    text-white
                    px-6 py-3
                    rounded-2xl
                    transition-all
                  "
                >
                  Alterar Foto
                </button>

              </div>

            </div>
          )}

          {tab === "add" && (
            <AddUser />
          )}

        </div>

      </div>

    </div>
  );
}