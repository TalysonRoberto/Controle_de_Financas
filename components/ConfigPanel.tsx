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
          w-[1000px]
          h-[700px]
          bg-zinc-900/95
          backdrop-blur-xl
          border border-zinc-800
          rounded-[32px]
          overflow-hidden
          flex
          shadow-[0_25px_80px_rgba(0,0,0,0.5)]
        "
      >

      {/* BOTÃO FECHAR */}
      <button
        onClick={onClose}
        className="
          absolute
          top-5
          right-5
          w-11
          h-11
          rounded-2xl
          bg-zinc-800
          hover:bg-red-500
          text-zinc-400
          hover:text-white
          flex
          items-center
          justify-center
          transition-all
        "
      >
        <X size={18} />
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

          <div className="mb-10">
            <h2 className="text-white text-2xl font-bold">
              Configurações
            </h2>

            <p className="text-zinc-500 text-sm mt-1">
              Personalize o sistema
            </p>
          </div>

          <div className="flex flex-col gap-3">

            {menu.map((item) => {

              const Icon = item.icon;

              const active = tab === item.id;

              return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`
                  flex
                  items-center
                  gap-4
                  h-14
                  px-4
                  rounded-2xl
                  transition-all
                  font-medium

                  ${
                    active
                      ? `
                        bg-green-500/10
                        border border-green-500/30
                        text-green-400
                      `
                      : `
                        text-zinc-400
                        hover:bg-zinc-800
                      `
                  }
                `}
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </button>
              );
            })}

          </div>

        </div>

        {/* CONTEÚDO */}
        <div
          className="
            flex-1
            overflow-y-auto
            p-10
            bg-gradient-to-b
            from-zinc-900
            to-zinc-950
          "
        >

          {/* CONTEÚDO */}
          {tab === "tema" && (

            <div>

              <h1 className="text-white text-3xl font-bold mb-3">
                Tema
              </h1>

              <p className="text-zinc-400 mb-8">
                Escolha o tema do sistema.
              </p>

              <div className="grid grid-cols-2 gap-6 max-w-[500px]">

                <div
                  className="
                    h-44
                    rounded-3xl
                    border-2
                    border-green-500
                    bg-zinc-950
                    cursor-pointer
                    p-4
                    flex
                    flex-col
                    justify-between
                  "
                >
                  <span className="text-white font-medium">
                    Dark
                  </span>

                  <div className="flex gap-2">
                    <div className="w-full h-6 bg-zinc-800 rounded" />
                    <div className="w-10 h-6 bg-green-500 rounded" />
                  </div>
                </div>

                <div
                  className="
                    h-44
                    rounded-3xl
                    border
                    border-zinc-700
                    bg-white
                    cursor-pointer
                    p-4
                    flex
                    flex-col
                    justify-between
                  "
                >
                  <span className="text-zinc-800 font-medium">
                    Light
                  </span>

                  <div className="flex gap-2">
                    <div className="w-full h-6 bg-zinc-300 rounded" />
                    <div className="w-10 h-6 bg-green-500 border rounded" />
                  </div>
                </div>

              </div>

            </div>
          )}
          {/* PERFIL */}
          {tab === "perfil" && (

          <div>
            <h2 className="text-white text-2xl font-bold">
              Usuário
            </h2>

            <p className="text-zinc-400 mt-1">
              Administrador do sistema
            </p>

            <button
              className="
                mt-5
                bg-green-500
                hover:bg-green-600
                px-6
                py-3
                rounded-2xl
                text-white
                font-medium
                transition-all
              "
            >
              Alterar foto
            </button>
          </div>
          )}
          {/* ASS USER */}
          {tab === "add" && (
            <AddUser />
          )}

        </div>

      </div>

    </div>
  );
}