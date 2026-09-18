'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ConfigPanel from '@/components/ConfigPanel';
import FinanceModal from '@/components/FinanceModal';

import type { Usuario, ModalTipo } from '@/types/finance';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const [user, setUser] = useState<Usuario | null>(null);
  const [openConfig, setOpenConfig] = useState(false);
  const [modalType, setModalType] = useState<ModalTipo>('pagamentos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleNavigate(rota: string) {
    router.push(rota);
  }

  function handleOpenAddModal(type: ModalTipo) {
    setModalType(type);
    setIsModalOpen(true);
  }

  useEffect(() => {
    const localUser = localStorage.getItem('user');

    if (!localUser) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(localUser));
    } catch {
      router.push('/login');
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('user');
    router.push('/login');
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {openConfig && (
        <ConfigPanel onClose={() => setOpenConfig(false)} />
      )}

      <FinanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tipo={modalType}
      />

      <Sidebar
        onConfig={() => setOpenConfig(true)}
        onModal={() => handleOpenAddModal('pagamentos')}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header user={user} />

        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col">
            <div className="flex-1 p-3 md:p-5 bg-gradient-mesh">
              <div className="w-full mx-auto animate-fadeIn h-full">
                {children}
              </div>
            </div>

            <footer className="shrink-0 px-3 md:px-5 py-2 border-t border-border bg-background/50 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-[10px] font-medium text-muted-foreground uppercase">
                <span>Controle de finanças @{new Date().getFullYear()} Todos os direitos reservados.</span>
                <span>
                  Desenvolvedor:{' '}
                  <a
                    href="https://github.com/TalysonRoberto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors duration-200"
                  >
                    Talyson Roberto
                  </a>
                </span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
