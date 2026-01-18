"use client";

import { motion } from "framer-motion";

import SideBar from "@/components/shared/SideBar";
import TopBar from "@/components/shared/TopBar";
import SettingsModal from "@/components/shared/SettingsModal";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <SideBar />

      <div className="flex-1 flex flex-col h-full overflow-y-auto relative scroll-smooth">
        <div className="sticky top-0 z-30 w-full">
          <TopBar />
        </div>

        <main className="flex-1 w-full max-w-[1800px] mx-auto pb-20 md:pb-6 px-4 md:px-8 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>

      <SettingsModal />
      <Toaster />
    </div>
  );
}
