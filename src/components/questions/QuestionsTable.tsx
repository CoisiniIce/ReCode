"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit3, Trash2, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { MASTERY_COLORS } from "@/constants";
import { QuestionRowData } from "@/types";
import { SortConfig } from "./QuestionsPageClient";


interface QuestionsTableProps {
  data: QuestionRowData[];
  onPreview: (item: QuestionRowData) => void;
  onDelete: (id: string) => void;
  sortConfig: SortConfig;
  onSort: (key: SortConfig["key"]) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getDifficultyStyle = (diff: string) => {
  switch (diff) {
    case "Easy":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Medium":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Hard":
      return "bg-rose-100 text-rose-700 border-rose-200";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const QuestionsTable = ({
  data,
  onPreview,
  onDelete,
  sortConfig,
  onSort,
  currentPage,
  totalPages,
  onPageChange,
}: QuestionsTableProps) => {
  const { t } = useTranslation();

  const [jumpPage, setJumpPage] = useState("");

  const handleJump = () => {
    const pageNum = parseInt(jumpPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpPage("");
    }
  };

  const renderSortIcon = (columnKey: SortConfig["key"]) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={14} className="ml-2 text-gray-400 opacity-50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} className="ml-2 text-[#ffa116]" />
    ) : (
      <ArrowDown size={14} className="ml-2 text-[#ffa116]" />
    );
  };

  return (
    <div className="space-y-4">
      <motion.div
        className="bg-white/70 backdrop-blur-xl rounded-[1.5rem] border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider font-bold border-b border-gray-100/50">
              <tr>
                {/* 1. Sortable ID Column */}
                <th
                  className="h-14 px-6 w-24 cursor-pointer hover:bg-gray-50 hover:text-gray-600 transition-colors select-none"
                  onClick={() => onSort("pid")}
                >
                  <div className="flex items-center">
                    {t("questionsTable.headId")}
                    {renderSortIcon("pid")}
                  </div>
                </th>

                <th className="h-14 px-4 min-w-[300px]">
                  {t("questionsTable.headQuestion")}
                </th>

                {/* 2. Sortable Mastery Column */}
                <th
                  className="h-14 px-4 cursor-pointer hover:bg-gray-50 hover:text-gray-600 transition-colors select-none"
                  onClick={() => onSort("masteryLevel")}
                >
                  <div className="flex items-center">
                    {t("questionsTable.headMastery")}
                    {renderSortIcon("masteryLevel")}
                  </div>
                </th>

                <th className="h-14 px-4">{t("questionsTable.headTags")}</th>

                {/* 3. Sortable Difficulty Column */}
                <th
                  className="h-14 px-4 cursor-pointer hover:bg-gray-50 hover:text-gray-600 transition-colors select-none"
                  onClick={() => onSort("difficulty")}
                >
                  <div className="flex items-center">
                    {t("questionsTable.headDifficulty")}
                    {renderSortIcon("difficulty")}
                  </div>
                </th>

                <th className="h-14 px-4 text-right pr-8">
                  {t("questionsTable.headActions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/60">
              {data.length > 0 ? (
                data.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-white/80 transition-all duration-200 group"
                  >
                    <td className="p-4 pl-6 font-mono text-gray-400 font-semibold">
                      {row.problem.pid}
                    </td>
                    <td className="p-4 min-w-[300px] max-w-[500px] wrap-break-word">
                      <span
                        onClick={() => onPreview(row)}
                        className="cursor-pointer font-semibold text-gray-700 group-hover:text-[#ffa116] transition-colors text-base"
                      >
                        {row.problem.title}
                      </span>
                    </td>
                    <td className="p-4">
                      <div
                        className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden relative"
                        title={`Level ${row.masteryLevel}`}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(row.masteryLevel / 5) * 100}%`,
                            backgroundColor: MASTERY_COLORS[row.masteryLevel],
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium mt-1 block">
                        Lv.{row.masteryLevel}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {row.problem.tags
                          .split(",")
                          .slice(0, 3)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="font-medium text-gray-500 bg-gray-100/50 border border-gray-100 hover:bg-gray-100 rounded-md px-2 py-0.5 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "border px-2.5 py-0.5 rounded-lg text-xs font-semibold shadow-sm backdrop-blur-sm",
                          getDifficultyStyle(row.problem.difficulty)
                        )}
                      >
                        {t(
                          `questionsTable.diff${row.problem.difficulty}` as any
                        )}
                      </Badge>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onPreview(row)}
                          className="h-9 w-9 rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        >
                          <Eye size={18} />
                        </Button>
                        <Link href={`/questions/${row.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <Edit3 size={18} />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(row.id)}
                          className="h-9 w-9 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="h-40 text-center text-gray-400 italic bg-white/40"
                  >
                    {t("questionsTable.empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-2">
          {/* Page number statistics */}
          <div className="text-sm text-gray-400 font-medium pl-2">
            <span className="text-gray-600">Page {currentPage}</span> of {totalPages}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Jump to page */}
            <div className="flex items-center gap-2 bg-gray-100/50 p-1 rounded-xl border border-gray-100">
              <input
                type="text"
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleJump()}
                placeholder="Page"
                className="w-12 bg-transparent border-none text-center text-sm focus:ring-0 placeholder:text-gray-400 text-gray-600"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleJump}
                className="h-7 px-2 rounded-lg text-xs hover:bg-white hover:text-[#ffa116] transition-all text-gray-500 font-bold cursor-pointer"
              >
                {t("questionsTable.jumpBtn")}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-xl border-gray-200 hover:bg-white hover:text-[#ffa116] hover:border-[#ffa116]/30 shadow-sm disabled:opacity-30 cursor-pointer transition-all"
              >
                <ChevronLeft size={16} className="mr-1" /> {t("questionsTable.prevBtn")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-xl border-gray-200 hover:bg-white hover:text-[#ffa116] hover:border-[#ffa116]/30 shadow-sm disabled:opacity-30 cursor-pointer transition-all"
              >
                {t("questionsTable.nextBtn")} <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
