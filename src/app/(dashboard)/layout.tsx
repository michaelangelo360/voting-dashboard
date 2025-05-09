// src/app/(dashboard)/layout.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { ProtectedRoute } from "@/components/auth/protectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Header 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          onLogout={logout}
          user={user}
        />
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} />
          <main className="flex-1 md:ml-64 p-4 md:p-6 pt-4">
            <div className="container mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
        <div className="md:ml-64">
          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  );
}