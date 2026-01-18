"use client";

import Link from "next/link";
import { StatCard } from "@/components/home/StatCard";
import { TodayFocus } from "@/components/home/TodayFocus";
import { MasteryBar } from "@/components/home/MasteryBar";
import { useTranslation } from "@/hooks/useTranslation";

import type { HomePageClientProps } from "@/types";

import {
  Plus,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Layers,
} from "lucide-react";

export default function HomePageClient({
  focusTasks,
  masteryDistribution,
  stats,
}: HomePageClientProps) {
  const { t } = useTranslation();

  return (
    <div className="relative w-full min-h-full">
      {/* grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.7]"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 w-full space-y-10 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {t("home.title")}
            </h1>
            <p className="text-gray-500 mt-3 text-lg font-medium">
              {t("home.welcomeBack")}
              <span className="inline-block px-3 py-1 mx-2 rounded-lg bg-orange-50 text-[#ffa116] font-bold border border-orange-100 shadow-sm">
                {stats.toReview} {t("home.questionsCount")}
              </span>
              {t("home.toReviewToday")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Add Note Button */}
            <Link href={"/questions/add"}>
              <button className="group relative flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 active:scale-95 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Plus
                  size={20}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
                <span>{t("home.addNote")}</span>
              </button>
            </Link>
          </div>
        </div>

        {/* StatCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title={t("home.mastered")}
            value={stats.masteredCount}
            variant="orange"
            footerText={t("home.masteredFooter")}
            icon={<CheckCircle2 className="w-32 h-32" />}
          />
          <StatCard
            title={t("home.totalQuestion")}
            value={stats.totalQuestions}
            variant="blue"
            trend={{
              value: stats.questionsTrend,
              label: t("home.totalQuestionFooter"),
              positive: true,
            }}
            icon={<Layers className="w-32 h-32" />}
          />
          <StatCard
            title={t("home.toReview")}
            value={stats.toReview}
            variant="purple"
            footerText={t("home.toReviewFooter")}
            icon={<BrainCircuit className="w-32 h-32" />}
          />
          <StatCard
            title={t("home.masteryRate")}
            value={`${stats.masteryRate}%`}
            variant="green"
            icon={<BookOpen className="w-32 h-32" />}
          />
        </div>

        {/* Chart & TodayFocus */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MasteryBar distribution={masteryDistribution} />
          </div>
          <TodayFocus focusTasks={focusTasks} totalTasks={stats.toReview} />
        </div>
      </div>
    </div>
  );
}
