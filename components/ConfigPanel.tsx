'use client';

import { useState } from 'react';

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
      className="
        fixed inset-0
        z-50
        bg-black/60
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          relative
          w-full
          max-w-6xl
          h-[75vh]
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          overflow-hidden
          flex
          flex-col
          md:flex-row
          shadow-2xl
        "
      >
        {/* FECHAR */}
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            z-20
            w-10
            h-10
            rounded-xl
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
        <aside
          className="
            md:w-[260px]
            bg-zinc-950
            border-b
            md:border-b-0
            md:border-r
            border-zinc-800
            p-4
          "
        >
          <div className="hidden md:block mb-8">
            <h2 className="text-white text-2xl font-bold">
              Configurações
            </h2>

            <p className="text-zinc-500 text-sm">
              Personalize o sistema
            </p>
          </div>

          {/* MOBILE */}
          <div className="md:hidden mb-4">
            <h2 className="text-white text-xl font-bold">
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
                    flex
                    items-center
                    gap-3
                    h-12
                    px-2
                    rounded-xl
                    transition-all
                    whitespace-nowrap

                    ${
                      active
                        ? `
                          bg-emerald-500/10
                          border
                          border-emerald-500/30
                          text-emerald-400
                        `
                        : `
                          text-zinc-400
                          hover:bg-zinc-800
                        `
                    }
                  `}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* CONTEÚDO */}
        <main
          className="
            flex-1
            overflow-y-auto
            p-5
            md:p-8
            bg-gradient-to-b
            from-zinc-900
            to-zinc-950
          "
        >
          {tab === 'tema' && <ThemeSettings />}

          {tab === 'perfil' && (
            <ProfileSettings />
          )}

          {tab === 'add' && (
            <AddUser />
          )}
        </main>
      </div>
    </div>
  );
}