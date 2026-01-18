import { useTranslation } from "@/hooks/useTranslation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import type { EditorHeaderProps } from "@/types/editor";

import { ArrowLeft, Save } from "lucide-react";

export const EditorHeader = ({
  pid,
  title,
  isSaving,
  mode,
  onUpdate,
  onSave,
  onCancel,
}: EditorHeaderProps) => {
  const { t } = useTranslation();

  const CancelConfirmDialog = ({ children }: { children: React.ReactNode }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("editorHeader.cancelTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("editorHeader.cancelDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t("editorHeader.continueEditing")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white"
          >
            {t("editorHeader.confirmExit")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 bg-white/80 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/50 shadow-sm sticky top-24 z-30 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full md:w-auto flex-1">
        <CancelConfirmDialog>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer shrink-0 hover:bg-gray-100 rounded-full h-10 w-10 text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </CancelConfirmDialog>

        <div className="flex flex-wrap items-center gap-4 flex-1 w-full sm:w-auto">
          {/* 题号输入 */}
          <div className="flex items-center gap-2 shrink-0 bg-gray-50/50 px-3 py-1 rounded-xl border border-gray-200/50">
            <span className="text-gray-400 font-mono font-bold text-lg">#</span>
            <Input
              value={pid}
              onChange={(e) => onUpdate("pid", e.target.value)}
              placeholder="ID"
              className="w-20 font-mono text-black border-none shadow-none bg-transparent focus-visible:ring-0 px-0 text-lg h-auto"
            />
          </div>
          {/* 标题输入 */}
          <Input
            value={title}
            onChange={(e) => onUpdate("title", e.target.value)}
            placeholder={t("editorHeader.input")}
            className="flex-1 min-w-[200px] font-extrabold text-2xl border-none shadow-none bg-transparent focus-visible:ring-0 px-0 h-auto placeholder:text-gray-300 text-gray-900"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 w-full md:w-auto mt-2 md:mt-0">
        <CancelConfirmDialog>
          <Button
            variant="ghost"
            className="flex-1 md:flex-none cursor-pointer hover:bg-gray-100 rounded-xl text-gray-500"
          >
            {t("editorHeader.cancel")}
          </Button>
        </CancelConfirmDialog>
        <Button
          className="bg-gray-900 hover:bg-black text-white flex-1 md:flex-none cursor-pointer rounded-xl px-6 h-11 shadow-lg shadow-gray-200 hover:shadow-gray-300 transition-all active:scale-95"
          onClick={onSave}
          disabled={isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving
            ? mode === "create"
              ? t("editorHeader.creating")
              : t("editorHeader.saving")
            : mode === "create"
            ? t("editorHeader.create")
            : t("editorHeader.save")}
        </Button>
      </div>
    </div>
  );
};
