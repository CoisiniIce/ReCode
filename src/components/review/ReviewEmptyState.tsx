import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReviewEmptyState = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-[#ffa116]/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
        <div className="relative w-32 h-32 bg-linear-to-br from-yellow-50 to-orange-50 rounded-[2.5rem] flex items-center justify-center shadow-inner border border-white/50">
          <Trophy
            className="text-[#ffa116] drop-shadow-md"
            size={64}
            strokeWidth={1.5}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
        {t("reviewEmptyState.title")}
      </h2>
      <p className="text-gray-500 max-w-md text-lg leading-relaxed mb-10">
        {t("reviewEmptyState.description")}
      </p>

      <Link href="/questions">
        <Button className="h-12 px-8 rounded-2xl bg-gray-900 hover:bg-black text-white shadow-xl shadow-gray-200 hover:shadow-gray-300 transition-all active:scale-95 text-base font-medium cursor-pointer">
          {t("reviewEmptyState.actionBtn")}{" "}
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </Link>
    </motion.div>
  );
};
