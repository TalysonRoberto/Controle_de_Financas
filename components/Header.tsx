'use client';

import { Landmark, Settings } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  user: {
    username?: string;
    avatars?: string;
  };
}

export default function Header({ user }: HeaderProps) {
  return (
    <header
      className="
        h-[56px]
        sticky
        top-0
        z-20
        flex
        items-center
        justify-between
        px-3
        md:px-5
        glass
        border-b border-border
      "
    >
      {/* MOBILE */}
      <Link href="/home" className="md:hidden">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <Landmark size={22} className="text-emerald-400" />
        </div>
      </Link>

      {/* ESPAÇO VAZIO NO DESKTOP */}
      <div className="hidden md:block" />

      {/* USUÁRIO */}
      {user && (
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-foreground font-semibold text-xs">
              {user.username}
            </p>
            <p className="text-muted-foreground text-[10px]">
              Usuário ativo
            </p>
          </div>

          {user?.avatars ? (
            <div className="relative">
              <img
                src={user.avatars}
                alt={`Avatar de ${user.username || 'usuário'}`}
                className="
                  w-8 h-8
                  rounded-full
                  object-cover
                  ring-2 ring-emerald-500/20
                  transition-all hover:ring-emerald-500/40
                "
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
            </div>
          ) : (
            <div className="relative">
              <div
                className="
                  w-8 h-8
                  rounded-full
                  bg-gradient-to-br from-emerald-500 to-cyan-500
                  flex items-center justify-center
                  text-white font-bold text-xs
                  ring-2 ring-emerald-500/20
                "
              >
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
