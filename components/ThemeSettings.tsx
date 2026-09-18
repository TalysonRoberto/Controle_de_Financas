'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div>
        <p className="text-muted-foreground mt-2 mb-8">Escolha a aparência do sistema.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 rounded-2xl skeleton" />
          ))}
        </div>
      </div>
    );
  }

  const options = [
    {
      id: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Tema escuro padrão',
      preview: {
        bg: 'bg-zinc-950',
        border: 'border-zinc-800',
        accent: 'bg-emerald-500',
        text: 'text-white',
        card: 'bg-zinc-900',
      },
    },
    {
      id: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Tema claro',
      preview: {
        bg: 'bg-white',
        border: 'border-zinc-200',
        accent: 'bg-emerald-500',
        text: 'text-zinc-900',
        card: 'bg-zinc-50',
      },
    },
    {
      id: 'system',
      label: 'Sistema',
      icon: Monitor,
      description: 'Segue o sistema',
      preview: {
        bg: 'bg-gradient-to-r from-zinc-950 to-white',
        border: 'border-zinc-400',
        accent: 'bg-emerald-500',
        text: 'text-zinc-500',
        card: 'bg-gradient-to-r from-zinc-900 to-zinc-100',
      },
    },
  ];

  return (
    <div>
      <p className="text-muted-foreground mt-2 mb-8">
        Escolha a aparência do sistema.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setTheme(option.id)}
              aria-label={`Tema ${option.label}${isActive ? ' (selecionado)' : ''}`}
              className={`
                group relative h-40 rounded-2xl p-4 flex flex-col justify-between text-left
                transition-all duration-200
                ${isActive
                  ? 'border-2 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                  : 'border border-border hover:border-muted-foreground/30 hover:scale-[1.01]'
                }
              `}
            >
              {/* Preview */}
              <div className={`w-full h-16 rounded-lg ${option.preview.bg} border ${option.preview.border} overflow-hidden`}>
                <div className="flex gap-1.5 p-2">
                  <div className={`w-3 h-3 rounded-full ${option.preview.accent}`} />
                  <div className={`flex-1 h-3 rounded-full ${option.preview.card}`} />
                </div>
                <div className="px-2 pb-1">
                  <div className={`w-12 h-1.5 rounded-full ${option.preview.card} mb-1`} />
                  <div className={`w-8 h-1.5 rounded-full ${option.preview.card} opacity-50`} />
                </div>
              </div>

              {/* Label */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={isActive ? 'text-emerald-400' : 'text-muted-foreground'} />
                  <span className={`text-sm font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {option.label}
                  </span>
                </div>

                {isActive && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full animate-fadeIn">
                    Ativo
                  </span>
                )}
              </div>

              <p className="text-[11px] text-muted-foreground">{option.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
