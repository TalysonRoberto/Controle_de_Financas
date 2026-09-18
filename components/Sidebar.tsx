'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Plus,
  Settings,
  BarChart3,
  LogOut,
  Landmark,
  Home,
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', route: '/home' },
    { icon: BarChart3, label: 'Gráficos', route: '/grafico' },
  ];

  const isActive = (route: string) => pathname === route;

  return (
    <>
      {/* DESKTOP */}
      <div
        className="
          hidden md:flex
          w-[64px]
          h-screen
          glass
          border-r border-border
          flex-col
          items-center
          justify-between
          py-4
        "
      >
        {/* BOTÕES PRINCIPAIS */}
        <div className="flex flex-col items-center gap-2">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/home')}
            aria-label="Ir para Home"
            className="mb-4"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-all hover:bg-emerald-500/20 hover:scale-105">
              <Landmark size={20} className="text-emerald-400" />
            </div>
          </button>

          {/* Botão ADD */}
          <button
            onClick={onModal}
            aria-label="Adicionar pagamento"
            className="
              w-10 h-10
              rounded-lg
              bg-emerald-500/10 hover:bg-emerald-500/20
              border border-emerald-500/20
              text-emerald-400
              flex items-center justify-center
              transition-all duration-200
              hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10
            "
          >
            <Plus size={18} />
          </button>

          {/* Nav items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.route);

            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                aria-label={item.label}
                className={`
                  relative w-10 h-10 rounded-lg flex items-center justify-center
                  transition-all duration-200 hover:scale-105
                  ${active
                    ? 'bg-emerald-500/15 text-emerald-400 shadow-lg shadow-emerald-500/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }
                `}
              >
                <Icon size={18} />
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-500 rounded-r-full" />
                )}
              </button>
            );
          })}

          {/* Config */}
          <button
            onClick={onConfig}
            aria-label="Configurações"
            className="
              w-10 h-10
              rounded-lg
              text-muted-foreground hover:text-foreground
              hover:bg-accent
              flex items-center justify-center
              transition-all duration-200
              hover:scale-105
            "
          >
            <Settings size={18} />
          </button>
        </div>

        {/* BOTÃO DE LOGOUT */}
        <button
          onClick={onLogout}
          aria-label="Sair"
          className="
            w-10 h-10
            rounded-lg
            bg-red-500/10
            hover:bg-red-500/20
            text-red-400
            hover:text-red-300
            flex items-center justify-center
            transition-all duration-200
            hover:scale-105
          "
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* MOBILE */}
      <div className="md:hidden">
        {/* OVERLAY */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"
          />
        )}

        {/* BOTÕES */}
        <div
          className={`
            fixed bottom-20 right-4 z-50
            flex flex-col gap-2
            transition-all duration-300
            ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
          `}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.route);

            return (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setMobileOpen(false);
                }}
                aria-label={item.label}
                className={`
                  w-11 h-11 rounded-full flex items-center justify-center shadow-xl
                  transition-all duration-200 active:scale-95
                  ${active
                    ? 'bg-emerald-500 text-white'
                    : 'bg-card border border-border text-emerald-400'
                  }
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Icon size={18} />
              </button>
            );
          })}

          <button
            onClick={() => {
              onModal();
              setMobileOpen(false);
            }}
            aria-label="Adicionar pagamento"
            className="w-11 h-11 rounded-full bg-card border border-border text-emerald-400 flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <Plus size={20} />
          </button>

          <button
            onClick={() => {
              onConfig();
              setMobileOpen(false);
            }}
            aria-label="Configurações"
            className="w-11 h-11 rounded-full bg-card border border-border text-muted-foreground flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <Settings size={18} />
          </button>

          <button
            onClick={() => {
              onLogout();
              setMobileOpen(false);
            }}
            aria-label="Sair"
            className="w-11 h-11 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* FAB */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          className="
            fixed bottom-5 right-4 z-50
            w-12 h-12 rounded-full
            bg-emerald-500 hover:bg-emerald-600
            text-white shadow-lg shadow-emerald-500/30
            flex items-center justify-center
            transition-all duration-300
            active:scale-95
          "
        >
          <Plus
            size={24}
            className={`transition-transform duration-300 ${mobileOpen ? 'rotate-45' : ''}`}
          />
        </button>
      </div>
    </>
  );
}
