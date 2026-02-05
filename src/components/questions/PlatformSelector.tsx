'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  PenLine,
  Link as LinkIcon,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchLeetCodeQuestionAction } from '@/actions/leetcode';
import { EditorFormData } from '@/types/editor';
import { useTranslation } from '@/hooks/useTranslation';

interface PlatformSelectorProps {
  onComplete: (data?: Partial<EditorFormData>) => void;
  onCancel: () => void;
}

export const PlatformSelector = ({
  onComplete,
  onCancel,
}: PlatformSelectorProps) => {
  const { t } = useTranslation();

  const [step, setStep] = useState<'select' | 'link'>('select');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    if (!url.trim()) return;
    setIsLoading(true);

    const result = await fetchLeetCodeQuestionAction(url);

    setIsLoading(false);
    if (result.success && result.data) {
      toast.success('Fetched successfully!');
      onComplete(result.data as Partial<EditorFormData>);
    } else {
      toast.error(result.error || 'Failed to fetch question');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[2rem] overflow-hidden p-8"
      >
        <AnimatePresence mode="wait">
          {step === 'select' ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {t('platformSelector.newQuestion')}
                </h2>
                <p className="text-gray-500">
                  {t('platformSelector.chooseOption')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* LeetCode Option */}
                <button
                  onClick={() => setStep('link')}
                  className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#ffa116] hover:bg-orange-50/50 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code2 className="text-[#ffa116]" size={24} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-gray-700">
                      {t('platformSelector.leetCode')}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {t('platformSelector.autoFill')}
                    </p>
                  </div>
                </button>

                {/* Custom Option */}
                <button
                  onClick={() => onComplete()}
                  className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PenLine className="text-blue-500" size={24} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-gray-700">
                      {t('platformSelector.custom')}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {t('platformSelector.customFill')}
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  variant="ghost"
                  onClick={onCancel}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {t('platformSelector.cancel')}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="link"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <LinkIcon className="text-[#ffa116]" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {t('platformSelector.pasteLink')}
                </h2>
                <p className="text-sm text-gray-500">
                  {t('platformSelector.autoFillDesc')}
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://leetcode.cn/problems/..."
                  className="h-12 rounded-xl bg-white/50 border-gray-200 focus:border-[#ffa116] focus:ring-[#ffa116]/20"
                  autoFocus
                />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep('select')}
                    className="flex-1 h-11 rounded-xl"
                  >
                    {t('platformSelector.back')}
                  </Button>
                  <Button
                    onClick={handleFetch}
                    disabled={isLoading || !url}
                    className="flex-1 h-11 rounded-xl bg-[#ffa116] hover:bg-[#e69318] text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                        {t('platformSelector.fetching')}
                      </>
                    ) : (
                      <>
                        {t('platformSelector.next')} <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
