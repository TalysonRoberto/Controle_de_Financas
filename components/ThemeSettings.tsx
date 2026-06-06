'use client';

import { Moon, Sun } from 'lucide-react';

export default function ThemeSettings() {
  return (
    <div>
      <p className="text-zinc-400 mt-2 mb-8">
        Escolha a aparência do sistema.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">

        {/* DARK */}
        <button
          className="
            md:h-44
            h-30
            rounded-3xl
            border-2
            border-emerald-500
            bg-zinc-950
            p-5
            flex
            flex-col
            justify-between
            text-left
          "
        >
          <div className="flex items-center gap-2">
            <Moon
              size={18}
              className="text-emerald-400"
            />

            <span className="text-white font-semibold">
              Dark
            </span>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 h-6 bg-zinc-800 rounded" />
            <div className="w-10 h-6 bg-emerald-500 rounded" />
          </div>
        </button>

        {/* LIGHT */}
        <button
          className="
            md:h-44
            h-30
            rounded-3xl
            border
            border-zinc-300
            bg-white
            p-5
            flex
            flex-col
            justify-between
            text-left
          "
        >
          <div className="flex items-center gap-2">
            <Sun
              size={18}
              className="text-amber-500"
            />

            <span className="text-zinc-900 font-semibold">
              Light
            </span>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 h-6 bg-zinc-300 rounded" />
            <div className="w-10 h-6 bg-emerald-500 rounded" />
          </div>
        </button>
      </div>
    </div>
  );
}