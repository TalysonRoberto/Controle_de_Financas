"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ConfigPanel from "@/components/ConfigPanel";
import FinanceModal from '@/components/FinanceModal';

export default function DashboardLayout({ children }) {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [openConfig, setOpenConfig] = useState(false);
  const [modalType, setModalType] = useState('pagamentos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenAddModal(type) {
    setModalType(type);
    setIsModalOpen(true);
  }
  

  useEffect(() => {

    const localUser = localStorage.getItem("user");

    if (!localUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(localUser));

  }, []);

  function handleLogout() {

    localStorage.removeItem("user");

    router.push("/login");
  }

  if (!user) {
    return null;
  }

  return (
   <div className="flex h-screen bg-black">
    
    { openConfig &&  <ConfigPanel onClose={() => setOpenConfig(false)}/> }

    <FinanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tipo={modalType}
    />
    
    <Sidebar 
        onConfig={() => setOpenConfig(true)}
        onModal={() => handleOpenAddModal('pagamentos')}
        onLogout={handleLogout}
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
      </main>
    </div>
  </div>
  );
}