'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ConfigPanel from '@/components/ConfigPanel';
import FinanceModal from '@/components/FinanceModal';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface User {
  id: number;
  username: string;
  password: string;
  avatars: string;
  auth_id: string | null;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [openConfig, setOpenConfig] = useState(false);

  const [modalType, setModalType] = useState<
    'pagamentos' | 'investimentos' | 'dividendos'
  >('pagamentos');

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  useEffect(() => {
    //console.log('Modal:', isModalOpen);
  }, [isModalOpen]);

  function handleNavigate(rota: string) {
    router.push(rota);
  }

  function handleOpenAddModal(
    type: 'pagamentos' | 'investimentos' | 'dividendos'
  ) {
    setModalType(type);
    setIsModalOpen(true);
  }

  useEffect(() => {
    const localUser =
      localStorage.getItem('user');

    if (!localUser) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(localUser));
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('user');

    router.push('/login');
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-black">
      {openConfig && (
        <ConfigPanel
          onClose={() =>
            setOpenConfig(false)
          }
        />
      )}

      <FinanceModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        tipo={modalType}
      />

      <Sidebar
        onConfig={() =>
          setOpenConfig(true)
        }
        onModal={() =>
          handleOpenAddModal(
            'pagamentos'
          )
        }
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />

        <main
          className="
            flex-1
            overflow-y-auto
            p-8
          "
        >
          <div className="w-full mx-auto">
            {children}
          </div>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 text-[11px] font-bold text-gray-500 uppercase ">
            <span>Controle de finanças @{new Date().getFullYear()} Todos os direitos reservados.</span>
            <span>
              Desenvolvedor:{" "}
              <a
                href="https://github.com/TalysonRoberto"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                Talyson Roberto
              </a>
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}