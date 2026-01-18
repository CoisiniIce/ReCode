"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useTranslation } from "@/hooks/useTranslation";

import { Github, Bug, Lightbulb, ArrowLeft } from "lucide-react";

const HelpPage = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-[#ffa116]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[15%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl w-full text-center space-y-12 relative z-10"
      >
        {/* big title */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-gray-900 via-gray-800 to-gray-500 pb-2">
            {t("help.problem")}
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl font-medium max-w-lg mx-auto leading-relaxed">
            {t("help.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {/* Bug Report Card */}
          <div className="group relative p-8 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-5">
            <div className="p-4 bg-orange-50 text-[#ffa116] rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Bug size={32} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {t("help.reportbug")}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                {t("help.bugDes")}
              </p>
            </div>
          </div>

          {/* Idea/Contribute Card */}
          <div className="group relative p-8 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-5">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Lightbulb size={32} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {t("help.contribute")}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed px-4">
                {t("help.contributeDes")}
              </p>
            </div>
          </div>
        </div>

        {/* gitHub */}
        <div className="flex flex-col items-center gap-6 py-10">
          <div className="h-px w-24 bg-linear-to-r from-transparent via-gray-200 to-transparent mb-4" />

          <a
            href="https://github.com/CoisiniIce/ReCode"
            target="_blank"
            className="group relative flex items-center gap-4 px-8 py-4 bg-gray-900 text-white rounded-[2rem] hover:bg-black transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

            <Github size={24} />
            <span className="font-bold text-lg">{t("help.github")}</span>
          </a>

          <div className="space-y-1">
            <p className="text-gray-400 text-sm font-mono tracking-widest uppercase opacity-70">
              github.com/CoisiniIce/ReCode
            </p>
          </div>
        </div>

        {/* back */}
        <div className="pt-4">
          <Link href={"/home"}>
            <button className="inline-flex items-center gap-3 px-6 py-2 text-gray-400 hover:text-[#ffa116] transition-all font-bold group cursor-pointer rounded-full hover:bg-orange-50/50">
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1.5 transition-transform"
              />
              <span className="uppercase tracking-widest text-xs">
                {t("help.back")}
              </span>
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpPage;
