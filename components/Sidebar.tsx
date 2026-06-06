'use client';

import { useState } from 'react';
import {
  Plus,
  Settings,
  BarChart3,
  LogOut,
  Landmark,
  Menu,
  X,
} from 'lucide-react';

interface SidebarProps {
  onConfig: () => void;
  onLogout: () => void;
  onModal: () => void;
  onNavigate: (rota: string) => void;
}

export default function Sidebar({
  onConfig,
  onLogout,
  onModal,
  onNavigate,
}: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* DESKTOP */}
      <div
        className="
          hidden md:flex
          w-[80px]
          h-screen
          bg-zinc-900
          border-r
          border-zinc-800
          flex-col
          items-center
          justify-between
          py-6
        "
      >
        {/* BOTÕES PRINCIPAIS */}
        <div className="flex flex-col items-center gap-4">
          {/* Botão Home */}
          <button onClick={() => onNavigate('/home')}>
            <Landmark
              size={50}
              className="text-emerald-500 mb-10"
            />
          </button>

          {/* Botão ADD */}
          <button
            onClick={onModal}
            className="
              w-14 h-14
              rounded-2xl
              bg-zinc-800
              hover:bg-zinc-700
              text-emerald-500
              flex items-center justify-center
              transition-all
            "
          >
            <Plus size={28} />
          </button>

          {/* Botão Grafico */}
          <button
            onClick={() => onNavigate('/grafico')}
            className="
              w-14 h-14
              rounded-2xl
              bg-zinc-800
              hover:bg-zinc-700
              text-emerald-500
              flex items-center justify-center
              transition-all
            "
          >
            <BarChart3 size={24} />
          </button>

          {/* Botão Config */}
          <button
            onClick={onConfig}
            className="
              w-14 h-14
              rounded-2xl
              bg-zinc-800
              hover:bg-zinc-700
              text-emerald-500
              flex items-center justify-center
              transition-all
            "
          >
            <Settings size={24} />
          </button>
        </div>

        {/* BOTÃO DE LOGOUT */}
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

      {/* MOBILE */}
      <div className="md:hidden">
        
        {/* OVERLAY */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="
              fixed
              inset-0
              bg-black/40
              backdrop-blur-sm
              z-40
            "
          />
        )}

        {/* BOTÕES */}
        <div
          className={`
            fixed
            bottom-24
            right-6
            z-50
            flex
            flex-col
            gap-3
            transition-all
            duration-300
            ${
              mobileOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }
          `}
        >

          {/* home*/}
          <button
            onClick={() => {
              onNavigate('/home');
              setMobileOpen(false);
            }}
            className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-800 text-emerald-500 flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
            title="Ir para Home"
          >
            <Landmark size={22} />
          </button>

          {/* Add*/}
          <button
            onClick={() => {
              onModal();
              setMobileOpen(false);
            }}
            className="w-14 h-14 rounded-full bg-zinc-800 text-emerald-500 flex items-center justify-center shadow-xl"
          >
            <Plus size={24} />
          </button>

          {/* grafico*/}
          <button
            onClick={() => {
              onNavigate('/grafico');
              setMobileOpen(false);
            }}
            className="w-14 h-14 rounded-full bg-zinc-800 text-emerald-500 flex items-center justify-center shadow-xl"
          >
            <BarChart3 size={22} />
          </button>

          {/* configuração*/}
          <button
            onClick={() => {
              onConfig();
              setMobileOpen(false);
            }}
            className="w-14 h-14 rounded-full bg-zinc-800 text-emerald-500 flex items-center justify-center shadow-xl"
          >
            <Settings size={22} />
          </button>

          {/* logout*/}
          <button
            onClick={() => {
              onLogout();
              setMobileOpen(false);
            }}
            className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl"
          >
            <LogOut size={22} />
          </button>
        </div>

        {/* FAB */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
            fixed
            bottom-6
            right-6
            z-50
            w-14
            h-14
            rounded-full
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            shadow-2xl
            flex
            items-center
            justify-center
            transition-all
            duration-300
          "
        >
          <Plus
            size={30}
            className={`
              transition-transform
              duration-300
              ${mobileOpen ? 'rotate-45' : ''}
            `}
          />
        </button>
      </div>
    </>
  );
}