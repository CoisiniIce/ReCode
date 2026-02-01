"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Code, FileText, Calendar, Edit3, ExternalLink, X } from "lucide-react";

import { MASTERY_COLORS_1 } from "@/constants";
import { QuestionRowData } from "@/types";

interface QuestionPreviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: QuestionRowData | null;
}

export const QuestionPreviewModal = ({
  isOpen,
  onOpenChange,
  data,
}: QuestionPreviewModalProps) => {
  if (!data) return null;

  const { t } = useTranslation();
  const tags = data.problem.tags.split(",");
  const latestSubmission = data.submissions[0];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl w-[95vw] h-[90vh] p-0 flex flex-col bg-white/95 backdrop-blur-2xl rounded-[1rem] border border-white/40 shadow-2xl overflow-hidden gap-0 ring-1 ring-black/5">
        {/* Header */}
        <DialogHeader className="p-8 border-b border-gray-100/50 bg-white/50 shrink-0 space-y-4">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-gray-400 font-bold text-xl tracking-wider">
                  #{data.problem.pid}
                </span>
                <Badge
                  variant="outline"
                  className="font-bold bg-white/80 border-gray-200 px-3 py-1 rounded-lg shadow-sm"
                >
                  {t(`questionsTable.diff${data.problem.difficulty}` as any)}
                </Badge>
                {/* mastery */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-600">
                  <div
                    className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]"
                    style={{
                      backgroundColor:
                        MASTERY_COLORS_1[data.masteryLevel] || "#ccc",
                    }}
                  />
                  Lv.{data.masteryLevel}
                </div>
              </div>
              <DialogTitle className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {data.problem.title}
              </DialogTitle>
            </div>

            {/* handle buttons */}
            <div className="flex items-center gap-3 pt-1 mr-8">
              {data.problem.url && (
                <a
                  href={data.problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-11 w-11 rounded-full p-0 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer"
                    title="Open Link"
                  >
                    <ExternalLink size={22} />
                  </Button>
                </a>
              )}
              <Link href={`/questions/${data.id}`}>
                <Button
                  size="sm"
                  className="gap-2 h-11 px-6 rounded-2xl bg-gray-900 hover:bg-black text-white shadow-md shadow-gray-200 hover:shadow-gray-400 transition-all active:scale-95 cursor-pointer"
                >
                  <Edit3 size={16} />{" "}
                  <span className="font-semibold">
                    {t("previewSheet.editBtn")}
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* bottom meta data */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-gray-100/50 border border-gray-100 font-medium text-gray-600 px-2.5 rounded-md"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <DialogDescription className="flex items-center gap-2 text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Calendar size={14} />
              {t("previewSheet.updatedAt")}:{" "}
              {data.updatedAt.toLocaleDateString()}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* content area */}
        <div className="flex-1 overflow-hidden bg-white/40 w-full relative">
          {/* background */}
          <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />

          <ScrollArea className="h-full w-full relative z-10">
            <div className="p-8 md:p-12 space-y-12 w-full max-w-full">
              {/* note */}
              <div className="space-y-5 w-full overflow-hidden">
                <div className="flex items-center gap-3 text-xl font-bold text-gray-800 pb-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <FileText size={24} />
                  </div>
                  <span>{t("previewSheet.myNotes")}</span>
                </div>

                <div className="p-8 rounded-[1.5rem] bg-white border border-gray-100 shadow-sm text-gray-700 min-h-[150px] w-full wrap-break-word">
                  {data.notes ? (
                    <article
                      className="prose prose-slate max-w-none 
                      prose-code:before:content-none! prose-code:after:content-none! 
                      prose-pre:max-w-full prose-pre:overflow-x-auto
                      prose-headings:text-gray-900 prose-headings:font-bold
                      prose-p:text-gray-600 prose-p:leading-relaxed
                      wrap-break-word w-full"
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeHighlight, rehypeKatex]}
                      >
                        {data.notes}
                      </ReactMarkdown>
                    </article>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[120px] text-gray-300 italic gap-3">
                      <FileText size={32} className="opacity-20" />
                      {t("previewSheet.noNotes")}
                    </div>
                  )}
                </div>
              </div>

              {/* code */}
              <div className="space-y-5 w-full overflow-hidden">
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
                    <div className="p-2 bg-orange-50 text-[#ffa116] rounded-xl">
                      <Code size={24} />
                    </div>
                    <span>{t("previewSheet.solutionCode")}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-lg"
                  >
                    {latestSubmission?.language || "N/A"}
                  </Badge>
                </div>

                <div
                  className="text-sm md:text-base prose max-w-none dark:prose-invert 
                  prose-pre:bg-[#1e1e1e] prose-pre:m-0 prose-pre:rounded-2xl prose-pre:p-6
                  prose-pre:w-full prose-pre:overflow-x-auto
                  prose-code:before:content-none! prose-code:after:content-none!
                  w-full shadow-xl shadow-gray-200/50 border border-gray-200/50 rounded-2xl overflow-hidden"
                >
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {`\`\`\`${latestSubmission?.language || "text"}\n${
                      latestSubmission?.code || t("previewSheet.noCode")
                    }\n\`\`\``}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
