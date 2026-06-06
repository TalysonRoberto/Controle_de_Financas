'use client';

import { Landmark } from 'lucide-react';
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
        h-[70px]
        sticky
        top-0
        z-20
        flex
        items-center
        justify-between
        px-4
        md:px-8
        bg-black
      "
    >
      {/* MOBILE */}
     <Link href="/home" className="md:hidden">
  <Landmark
    size={36}
    className="text-emerald-500"
  />
</Link>

      {/* ESPAÇO VAZIO NO DESKTOP */}
      <div className="hidden md:block" />

      {/* USUÁRIO */}
      {user && (
        <div className="flex items-center gap-3">
          {user?.avatars ? (
            <img
              src={user.avatars}
              alt="avatar"
              className="
                w-10 h-10
                md:w-12 md:h-12
                rounded-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                w-10 h-10
                md:w-12 md:h-12
                rounded-full
                bg-zinc-800
                flex
                items-center
                justify-center
                text-white
                font-bold
              "
            >
              {user.username?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="text-right">
            <p className="text-white font-semibold text-sm md:text-base">
              {user.username}
            </p>

            <p className="text-zinc-400 text-xs md:text-sm">
              Usuário ativo
            </p>
          </div>
        </div>
      )}
    </header>
  );
}