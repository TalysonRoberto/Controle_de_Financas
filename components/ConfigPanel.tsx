'use client';

import { useState, useEffect, useCallback } from 'react';

import {
  Palette,
  User,
  UserPlus,
  X,
} from 'lucide-react';

import AddUser from './AddUser';
import ThemeSettings from './ThemeSettings';
import ProfileSettings from './ProfileSettings';

interface ConfigPanelProps {
  onClose: () => void;
}

type TabType = 'tema' | 'perfil' | 'add';

export default function ConfigPanel({
  onClose,
}: ConfigPanelProps) {
  const [tab, setTab] = useState<TabType>('tema');

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const menu = [
    {
      id: 'tema' as const,
      label: 'Tema',
      icon: Palette,
    },
    {
      id: 'perfil' as const,
      label: 'Perfil',
      icon: User,
    },
    {
      id: 'add' as const,
      label: 'Add User',
      icon: UserPlus,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="
          relative w-full max-w-6xl h-[75vh]
          bg-card border border-border
          rounded-3xl overflow-hidden
          flex flex-col md:flex-row
          shadow-2xl
          animate-fadeInScale
        "
      >
        {/* FECHAR */}
        <button
          onClick={onClose}
          aria-label="Fechar configurações"
          className="
            absolute top-4 right-4 z-20
            w-10 h-10 rounded-xl
            bg-muted hover:bg-red-500/20
            text-muted-foreground hover:text-red-400
            flex items-center justify-center
            transition-all duration-200
          "
        >
          <X size={18} />
        </button>

        {/* MENU */}
        <aside className="
          md:w-[260px]
          bg-muted/50
          border-b md:border-b-0 md:border-r border-border
          p-4
        ">
          <div className="hidden md:block mb-8">
            <h2 className="text-foreground text-2xl font-bold">
              Configurações
            </h2>
            <p className="text-muted-foreground text-sm">
              Personalize o sistema
            </p>
          </div>

          <div className="md:hidden mb-4">
            <h2 className="text-foreground text-xl font-bold">
              Configurações
            </h2>
          </div>

          <div className="flex md:flex-col gap-2 overflow-x-auto text-[13px]">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`
                    flex items-center gap-3 h-12 px-3
                    rounded-xl transition-all duration-200 whitespace-nowrap
                    ${active
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }
                  `}
                >
                  <Icon size={16} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* CONTEÚDO */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8 bg-gradient-to-b from-card to-background">
          {tab === 'tema' && <ThemeSettings />}
          {tab === 'perfil' && <ProfileSettings />}
          {tab === 'add' && <AddUser />}
        </main>
      </div>
    </div>
  );
}
