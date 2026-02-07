import { useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";

import { ReviewTask } from "@/types/review";

import { BrainCircuit, Clock } from "lucide-react";


interface ReviewHeaderProps {
  reviews:ReviewTask[];
}

export const ReviewHeader = ({ reviews }: ReviewHeaderProps) => {
  const { t } = useTranslation();

  const count = reviews.length;

  const totalEstimatedTime = useMemo(() => {
    let total = 0;

    for(const task of reviews){
      const diff = task.difficulty.toLowerCase();
      const mastery = task.masteryLevel;

      // default hard
      let min = 7, max = 15;

      if (["easy", "容易", "简单"].includes(diff)) {
        min = 3; max = 7;
      } else if (["medium", "中等"].includes(diff)) {
        min = 5; max = 12;
      }

      // random time
      let baseTime = Math.floor(Math.random() * (max - min + 1)) + min;

      // adjust by mastery level
      const masteryWeight = 1 - (mastery * 0.1); 
      const finalTaskTime = Math.max(min, Math.round(baseTime * masteryWeight));

      total += finalTaskTime;

    }

    return total;
  },[reviews]);

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-[#ffa116] rounded-2xl shadow-sm border border-orange-100/50">
            <BrainCircuit size={40} strokeWidth={2.5} />
          </div>
          {t("reviewHeader.title")}
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
          {count > 0
            ? t("reviewHeader.descriptionWithCount").replace(
                "{{count}}",
                count.toString()
              )
            : t("reviewHeader.descriptionEmpty")}
        </p>
      </div>

      {count > 0 && (
        <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-md text-gray-600 px-5 py-2.5 rounded-2xl text-sm font-bold border border-gray-200/60 shadow-sm whitespace-nowrap">
          <Clock size={18} className="text-[#ffa116]" />
          <span>
            {t("reviewHeader.estimatedTime").replace(
              "{{time}}",
              totalEstimatedTime.toString()
            )}
          </span>
        </div>
      )}
    </div>
  );
};
