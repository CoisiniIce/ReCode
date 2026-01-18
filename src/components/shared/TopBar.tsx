"use client";

import { useUserStore } from "@/store/useUserStore";

import { Settings2 } from "lucide-react";
import Image from "next/image";
import avatar from "../../../public/images/avatar.png";

export default function TopBar() {
  const { setIsSettingModalOpen } = useUserStore();

  return (
    <header className="h-16 md:h-20 bg-white/60 backdrop-blur-md border-b border-white/40 flex items-center justify-between px-6 transition-all z-30">
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 tracking-tight">
        ReCode
      </h1>

      <div className="flex items-center gap-4">
        {/* Settings Button */}
        <div
          className="w-10 h-10 rounded-full bg-white/50 hover:bg-white border border-transparent hover:border-gray-200 cursor-pointer hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 flex justify-center items-center group"
          onClick={() => setIsSettingModalOpen(true)}
        >
          <Settings2
            size={20}
            className="text-gray-500 group-hover:text-[#ffa116] transition-colors"
          />
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full p-0.5 bg-linear-to-tr from-gray-100 to-gray-300 hover:from-[#ffa116] hover:to-orange-300 cursor-pointer transition-all duration-500 shadow-sm hover:shadow-md">
          <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
            <Image
              src={avatar}
              alt="Myself"
              width={40}
              height={40}
              className="object-cover"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
