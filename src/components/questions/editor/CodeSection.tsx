import { useTranslation } from "@/hooks/useTranslation";

import Editor from "@monaco-editor/react";
import { Code2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/constants";

import type { CodeSectionProps } from "@/types/editor";

export const CodeSection = ({ code, language, onUpdate }: CodeSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[500px] lg:h-full">
      <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            {t("codeSection.title")}
          </span>
        </div>
        <Select
          value={language}
          onValueChange={(val) => onUpdate("language", val)}
        >
          <SelectTrigger className="w-[140px] h-8 bg-white">
            <SelectValue placeholder={t("codeSection.languagePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={language}
          theme="light"
          value={code}
          onChange={(value) => onUpdate("code", value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            scrollBeyondLastLine: false,
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  );
};
