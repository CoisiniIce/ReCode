import { useTranslation } from '@/hooks/useTranslation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/alert-dialog';

import type { EditorHeaderProps } from '@/types/editor';

import { ArrowLeft, Save, Sparkles } from 'lucide-react';

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
          <AlertDialogTitle>{t('editorHeader.cancelTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('editorHeader.cancelDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t('editorHeader.continueEditing')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white"
          >
            {t('editorHeader.confirmExit')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className="sticky top-4 z-40 w-full bg-white/80 backdrop-blur-2xl ring-1 ring-gray-300/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem] p-2 transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 h-auto md:h-16 px-2">
        <div className="flex items-center gap-3 w-full md:w-auto flex-1">
          {/* back button */}
          <CancelConfirmDialog>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer shrink-0 hover:bg-gray-100/80 rounded-full h-12 w-12 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </CancelConfirmDialog>

          {/* split line */}
          <div className="h-6 w-px bg-gray-200/60 hidden md:block" />

          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* ID*/}
            <div className="hidden sm:flex items-center gap-1 shrink-0 bg-gray-100/50 hover:bg-gray-100 transition-colors px-3 py-1.5 rounded-xl border border-transparent focus-within:border-[#ffa116]/30 focus-within:bg-white focus-within:shadow-sm">
              <span className="text-gray-400 font-mono font-bold text-sm select-none">
                #
              </span>
              <Input
                value={pid}
                onChange={(e) => onUpdate('pid', e.target.value)}
                placeholder="ID"
                className="w-16 font-mono text-gray-700 font-medium border-none shadow-none bg-transparent focus-visible:ring-0 px-0 h-auto py-0"
              />
            </div>

            {/* Title */}
            <Input
              value={title}
              onChange={(e) => onUpdate('title', e.target.value)}
              placeholder={t('editorHeader.input')}
              className="flex-1 min-w-[120px] font-bold text-xl border-none shadow-none bg-transparent focus-visible:ring-0 px-2 h-auto placeholder:text-gray-300 text-gray-800 tracking-tight"
            />
          </div>
        </div>

        {/* Right Area */}
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end pr-2">
          <CancelConfirmDialog>
            <Button
              variant="ghost"
              className="hidden md:flex cursor-pointer hover:bg-gray-100/50 rounded-xl text-gray-500 font-medium h-11"
            >
              {t('editorHeader.cancel')}
            </Button>
          </CancelConfirmDialog>

          <Button
            className="bg-[#ffa116] hover:bg-[#ff9000] text-white cursor-pointer rounded-xl px-6 h-11 shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="font-semibold">
              {isSaving
                ? mode === 'create'
                  ? t('editorHeader.creating')
                  : t('editorHeader.saving')
                : mode === 'create'
                  ? t('editorHeader.create')
                  : t('editorHeader.save')}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
