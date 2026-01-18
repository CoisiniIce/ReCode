import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

import { ExternalLink, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { ReviewTask } from "@/types/review";
import { MASTERY_COLORS_1 } from "@/constants";

import { getDifficultyColor } from "@/hooks";

interface ReviewCardProps {
  task: ReviewTask;
  isActive: boolean;
  isSubmitting: boolean;
  onActivate: () => void;
  onCancel: () => void;
  onRate: (score: number) => void;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50, transition: { duration: 0.2 } },
};

const getLeetCodeUrl = (
  title: string,
  url: string | null,
  slug: string | null
) => {
  if (url) return url;
  const finalSlug = slug || title.toLowerCase().replace(/\s+/g, "-");
  return `https://leetcode.com/problems/${finalSlug}/`;
};

const RateButton = ({
  score,
  label,
  colorClass,
  onClick,
  disabled,
  title,
}: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      "flex flex-col items-center justify-center gap-1 h-20 rounded-2xl border transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group",
      colorClass
    )}
  >
    <span className="text-xl font-black">{score}</span>
    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 group-hover:opacity-100">
      {label}
    </span>
  </button>
);

export const ReviewCard = ({
  task,
  isActive,
  isSubmitting,
  onActivate,
  onCancel,
  onRate,
}: ReviewCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      layout
      variants={itemVariants}
      className={cn(
        "group relative bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 transition-all duration-300 border",
        isActive
          ? "bg-white border-[#ffa116]/50 ring-4 ring-[#ffa116]/10 shadow-[0_20px_40px_-12px_rgba(255,161,22,0.2)] z-10 scale-[1.02]"
          : "border-white/60 hover:border-[#ffa116]/30 hover:bg-white/80 hover:shadow-lg hover:shadow-gray-200/50"
      )}
    >
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
        {/* Left Info Area */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-gray-400 font-bold text-lg tracking-wide bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100">
              #{task.questionId}
            </span>
            <Badge
              variant="outline"
              className={cn(
                "font-bold border px-3 py-1 rounded-lg shadow-sm text-xs",
                getDifficultyColor(task.difficulty)
              )}
            >
              {t(`questionsTable.diff${task.difficulty}` as any)}
            </Badge>
            {task.lastReviewDate && (
              <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5 ml-auto md:ml-0 bg-white/50 px-2 py-1 rounded-md">
                <Calendar size={12} />
                <span className="hidden sm:inline">
                  {t("reviewCard.lastReview")}:
                </span>
                {task.lastReviewDate}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#ffa116] transition-colors duration-300">
            {task.title}
          </h3>

          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {t("reviewCard.currentMastery")}
            </span>
            <div className="h-2.5 flex-1 max-w-[120px] rounded-full bg-gray-100 overflow-hidden inner-shadow">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                style={{
                  width: `${(task.masteryLevel / 5) * 100}%`,
                  backgroundColor:
                    MASTERY_COLORS_1[task.masteryLevel] || "#ccc",
                }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-gray-500">
              Lv.{task.masteryLevel}
            </span>
          </div>
        </div>

        {/* Right Action Area */}
        <div className="flex flex-col items-end gap-4 justify-center min-w-[240px]">
          {!isActive ? (
            <>
              <a
                href={getLeetCodeUrl(task.title, task.url, task.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                onClick={onActivate}
              >
                <Button className="w-full bg-gray-900 hover:bg-black gap-3 h-14 text-base font-bold rounded-2xl shadow-xl shadow-gray-200 hover:shadow-gray-300 hover:-translate-y-0.5 transition-all cursor-pointer">
                  {t("reviewCard.solveBtn")} <ExternalLink size={18} />
                </Button>
              </a>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-900 font-medium hover:bg-gray-100/50 rounded-xl w-full h-10"
                onClick={onActivate}
              >
                {t("reviewCard.alreadySolved")}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-end gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between w-full mb-1">
                <p className="text-sm font-bold text-gray-900">
                  {t("reviewCard.rateTitle")}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500 h-8 px-2 rounded-lg -mr-2"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  {t("reviewCard.cancelBtn")}
                </Button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full">
                {/* Fail */}
                <RateButton
                  score={0}
                  label={t("reviewCard.rateFail")}
                  colorClass="bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-200"
                  onClick={() => onRate(0)}
                  disabled={isSubmitting}
                  title={t("reviewCard.titleFail")}
                />

                {/* Hard */}
                <RateButton
                  score={1}
                  label={t("reviewCard.rateHard")}
                  colorClass="bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-200"
                  onClick={() => onRate(1)}
                  disabled={isSubmitting}
                  title={t("reviewCard.titleHard")}
                />

                {/* Medium */}
                <RateButton
                  score={2}
                  label={t("reviewCard.rateMedium")}
                  colorClass="bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-500 hover:text-white hover:shadow-lg hover:shadow-amber-200"
                  onClick={() => onRate(2)}
                  disabled={isSubmitting}
                  title={t("reviewCard.titleMedium")}
                />

                {/* Good */}
                <RateButton
                  score={3}
                  label={t("reviewCard.rateGood")}
                  colorClass="bg-yellow-50 text-yellow-600 border-yellow-100 hover:bg-yellow-500 hover:text-white hover:shadow-lg hover:shadow-yellow-200"
                  onClick={() => onRate(3)}
                  disabled={isSubmitting}
                  title={t("reviewCard.titleGood")}
                />

                {/* Great */}
                <RateButton
                  score={4}
                  label={t("reviewCard.rateGreat")}
                  colorClass="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-200"
                  onClick={() => onRate(4)}
                  disabled={isSubmitting}
                  title={t("reviewCard.titleGreat")}
                />

                {/* Easy */}
                <RateButton
                  score={5}
                  label={t("reviewCard.rateEasy")}
                  colorClass="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200"
                  onClick={() => onRate(5)}
                  disabled={isSubmitting}
                  title={t("reviewCard.titleEasy")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
