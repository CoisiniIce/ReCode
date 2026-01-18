import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { getDifficultyColor } from "@/hooks";

import { ExternalLink, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { MASTERY_COLORS_1, DIFFICULTIES } from "@/constants";

import { Link as LinkIcon } from "lucide-react";

interface MetaSidebarProps {
  difficulty: string;
  tags: string[];
  link: string;
  masteryLevel: number;
  onUpdate: (field: string, value: any) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const MetaSidebar = ({
  difficulty,
  tags,
  link,
  masteryLevel,
  onUpdate,
  onAddTag,
  onRemoveTag,
}: MetaSidebarProps) => {
  const { t } = useTranslation();

  const [tagInput, setTagInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddTag(tagInput);
      setTagInput("");
    }
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Problem Link 卡片 */}
      <div className="bg-white/60 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/60 shadow-sm transition-all hover:shadow-md">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-3 ml-1">
          <LinkIcon size={14} className="text-blue-500" />
          {t("metaSidebar.problemLink")}
        </label>
        <div className="relative group">
          <Input
            type="url"
            placeholder="https://leetcode.com/problems/..."
            value={link}
            onChange={(e) => onUpdate("link", e.target.value)}
            className="h-11 bg-gray-50/80 border-transparent hover:bg-white focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all text-sm rounded-xl px-4 shadow-inner"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={14} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Difficulty */}
      <div className="bg-white/60 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/60 shadow-sm transition-all hover:shadow-md">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3 ml-1">
          {t("metaSidebar.difficulty")}
        </label>
        <Select
          value={difficulty}
          onValueChange={(val) => onUpdate("difficulty", val)}
        >
          <SelectTrigger
            className={cn(
              "w-full h-11 border-transparent font-semibold rounded-xl px-4 transition-all shadow-sm",
              getDifficultyColor(difficulty) // 假设这个函数返回背景色 class
            )}
          >
            <SelectValue placeholder={t("metaSidebar.difficultyPlaceholder")} />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-100 shadow-xl bg-white/95 backdrop-blur-xl">
            {DIFFICULTIES.map((diff) => (
              <SelectItem
                key={diff}
                value={diff}
                className="cursor-pointer rounded-lg my-1 font-medium"
              >
                <span
                  className={cn(
                    "font-medium",
                    diff === "Easy"
                      ? "text-emerald-600"
                      : diff === "Medium"
                      ? "text-amber-600"
                      : "text-rose-600"
                  )}
                >
                  {t(`questionsTable.diff${diff}` as any)}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="bg-white/60 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/60 shadow-sm flex-1 flex flex-col transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-3 ml-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {t("metaSidebar.tags")}
          </label>
          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {tags.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50 flex-1 content-start overflow-y-auto max-h-[250px] shadow-inner">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-1.5 text-sm bg-white border border-gray-100 text-gray-600 gap-2 rounded-lg shadow-sm group hover:border-red-200 transition-colors"
            >
              {tag}
              <button
                onClick={() => onRemoveTag(tag)}
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              tags.length === 0
                ? t("metaSidebar.tagInputPlaceholder")
                : t("metaSidebar.tagAddMore")
            }
            className="flex-1 bg-transparent outline-none text-sm min-w-[80px] px-2 py-1 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Mastery */}
      <div className="bg-white/60 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/60 shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-center mb-4 ml-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {t("metaSidebar.mastery")}
          </label>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm"
            style={{
              backgroundColor: MASTERY_COLORS_1[masteryLevel] || "#ccc",
            }}
          >
            Lv. {masteryLevel}
          </span>
        </div>
        <div className="px-2">
          <Slider
            value={[masteryLevel]}
            onValueChange={(val) => onUpdate("masteryLevel", val[0])}
            max={5}
            min={0}
            step={1}
            className="py-2 cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-[10px] font-bold text-gray-300 mt-3 uppercase tracking-widest px-1">
          <span>{t("metaSidebar.masteryNewbie")}</span>
          <span>{t("metaSidebar.masteryMaster")}</span>
        </div>
      </div>
    </div>
  );
};
