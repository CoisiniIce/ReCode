"use client";

import { useTranslation } from "@/hooks/useTranslation";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import type { TodayFocusProps } from "@/types";

export const TodayFocus = ({ focusTasks, totalTasks }: TodayFocusProps) => {
  const { t } = useTranslation();

  const hasTasks = focusTasks && focusTasks.length > 0;

  return (
    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 h-full flex flex-col">
      {/* title and badge */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          {t("todayFocus.title")}
        </h3>
        {totalTasks > 0 && (
          <span className="text-xs font-bold bg-[#ffa116]/10 text-[#ffa116] px-3 py-1.5 rounded-full border border-[#ffa116]/20">
            {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 overflow-hidden gap-4">
        {hasTasks ? (
          /* list */
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 -mr-2 scroll-smooth">
            {focusTasks.map((task) => (
              <div
                key={task.id}
                className="group relative p-5 bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-md hover:border-[#ffa116]/30 transition-all duration-300 shrink-0 cursor-pointer"
              >
                <div className="absolute left-0 top-4 bottom-4 w-1 bg-gray-100 rounded-r-full group-hover:bg-[#ffa116] transition-colors duration-300" />

                <div className="pl-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">
                    {t("todayFocus.suggestedReview")}
                  </p>
                  <div className="flex justify-between items-start gap-3">
                    <p className="font-bold text-gray-700 text-base leading-snug truncate flex-1 group-hover:text-[#ffa116] transition-colors">
                      {task.title}
                    </p>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-lg border shrink-0 font-bold uppercase tracking-wide ${
                        task.difficulty === "Easy"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : task.difficulty === "Medium"
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : "bg-rose-50 text-rose-600 border-rose-100"
                      }`}
                    >
                      {task.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* no missions */
          <div className="flex flex-col items-center justify-center h-full text-gray-800 text-sm min-h-[160px] bg-white/40 rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-green-100/50 rounded-full flex items-center justify-center mb-4 text-green-600">
              <CheckCircle2 size={32} />
            </div>
            <p className="font-bold text-lg text-gray-900">
              {t("todayFocus.done")}
            </p>
            <p className="text-gray-500 mt-1">{t("todayFocus.notice")}</p>
          </div>
        )}

        {/* action button */}
        {totalTasks > 0 && (
          <div className="pt-4 shrink-0 mt-auto">
            <Link href="/review">
              <button className="group w-full py-4 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-sm transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-gray-200 hover:shadow-gray-300 flex items-center justify-center gap-2 relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  {t("todayFocus.start")}{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
