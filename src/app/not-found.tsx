"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useTranslation } from "@/hooks/useTranslation";

import { Home, Search, FileQuestion } from "lucide-react";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* grid texture、halo */}
      <div
        className="absolute inset-0 bg-[#f8f9fa] z-0"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-orange-200/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-lg w-full text-center space-y-10"
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-20 p-8 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/60 text-[#ffa116]"
          >
            <FileQuestion size={80} strokeWidth={1.2} />

            <div className="absolute -top-3 -right-3 p-3 bg-gray-900 rounded-2xl text-white shadow-xl animate-bounce">
              <Search size={24} />
            </div>
          </motion.div>

          <h1 className="absolute top-1/2 -translate-y-1/2 text-[12rem] font-black text-transparent bg-clip-text bg-linear-to-b from-gray-200/50 to-transparent select-none z-10 tracking-tighter">
            404
          </h1>
        </div>

        {/* 文案 */}
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            {t("notFound.title")}
          </h2>
          <p className="text-gray-500 text-xl font-medium max-w-sm mx-auto leading-relaxed">
            {t("notFound.desc")}
          </p>
        </div>

        {/* button */}
        <div className="flex flex-col gap-5 items-center pt-6">
          <Link href="/home" className="group relative w-full max-w-[220px]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] transition-all cursor-pointer flex items-center justify-center gap-3 overflow-hidden"
            >
              {/* light decoration */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

              <Home size={20} />
              <span className="relative z-10">{t("notFound.backHome")}</span>
            </motion.button>
          </Link>

          {/* Status Code */}
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full border border-gray-200">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">
              {t("notFound.errorCode")}: ERR_PAGE_MISSING
            </span>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 hover:opacity-100 transition-opacity">
        <Link
          href="/help"
          className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2"
        >
          Need Help?
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
