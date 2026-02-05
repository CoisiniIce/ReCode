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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Code, FileText, Calendar, Edit3 } from "lucide-react";

import { MASTERY_COLORS } from "@/constants";
import { QuestionRowData } from "@/types";

interface QuestionPreviewSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: QuestionRowData | null;
}

export const QuestionPreviewSheet = ({
  isOpen,
  onOpenChange,
  data,
}: QuestionPreviewSheetProps) => {
  if (!data) return null;

  const { t } = useTranslation();

  const tags = data.problem.tags.split(",");
  const latestSubmission = data.submissions[0];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col bg-white h-screen">
        <SheetHeader className="p-6 border-b border-gray-100 bg-gray-50/30 shrink-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-gray-400 font-bold">
                  #{data.problem.pid}
                </span>
                <Badge
                  variant="outline"
                  className="font-medium border bg-white"
                >
                  {t(`questionsTable.diff${data.problem.difficulty}` as any)}
                </Badge>
              </div>
              <Link href={`/questions/${data.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 h-8 text-xs"
                >
                  <Edit3 size={12} /> {t("previewSheet.editBtn")}
                </Button>
              </Link>
            </div>
            <div>
              <SheetTitle className="text-2xl font-bold text-gray-900 leading-tight">
                {data.problem.title}
              </SheetTitle>
              <SheetDescription className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        MASTERY_COLORS[data.masteryLevel] || "#ccc",
                    }}
                  ></span>
                  {t("previewSheet.masteryLevel")} {data.masteryLevel}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar size={12} />
                  {t("previewSheet.updatedAt")}:{" "}
                  {data.updatedAt.toLocaleDateString()}
                </span>
              </SheetDescription>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white border font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="p-6 pb-20 space-y-8 w-full max-w-[100vw] sm:max-w-xl">
              {/* code */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <Code size={16} className="text-[#ffa116]" />
                  <span>{t("previewSheet.solutionCode")}</span>
                  <span className="ml-auto text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {latestSubmission?.language ||
                      t("previewSheet.notAvailable")}
                  </span>
                </div>
                <div
                  className="text-base prose max-w-none dark:prose-invert 
                  prose-pre:bg-[#0d1117] prose-pre:m-0 prose-pre:rounded-xl prose-pre:max-w-full prose-pre:overflow-x-auto
                  prose-code:before:content-none prose-code:after:content-none
                  w-full"
                >
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {`\`\`\`${latestSubmission?.language || "text"}\n${
                      latestSubmission?.code || t("previewSheet.noCode")
                    }\n\`\`\``}
                  </ReactMarkdown>
                </div>
              </div>

              {/* note */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <FileText size={16} className="text-blue-500" />
                  <span>{t("previewSheet.myNotes")}</span>
                </div>
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-sm min-h-[100px]">
                  {data.notes ? (
                    <article
                      className="prose prose-sm max-w-none 
                    prose-code:before:content-none prose-code:after:content-none 
                    prose-pre:max-w-full prose-pre:overflow-x-auto
                    wrap-break-word"
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeHighlight, rehypeKatex]}
                      >
                        {data.notes}
                      </ReactMarkdown>
                    </article>
                  ) : (
                    <p className="text-gray-400 italic">
                      {t("previewSheet.noNotes")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
