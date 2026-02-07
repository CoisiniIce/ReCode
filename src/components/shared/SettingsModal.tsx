'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { updateUserPreferences } from '@/actions/updateUser';
import { toast } from 'sonner';
import { LANGUAGES } from '@/constants';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { User, Code2, Globe, Layers } from 'lucide-react';

export default function SettingsModal() {
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    isSettingModalOpen,
    setIsSettingModalOpen,
    username,
    preferredLang: storePreferredLang,
    uiLanguage: storeUiLanguage,
    dailyReviewLimit: storeDailyReviewLimit,
    setLanguage: setStoreLanguage,
    setPreferredLang: setStorePreferredLang,
    setDailyReviewLimit: setStoreDailyReviewLimit,
  } = useUserStore();

  // Local copy status
  const [localPreferredLang, setLocalPreferredLang] =
    useState(storePreferredLang);
  const [localUiLanguage, setLocalUiLanguage] = useState(storeUiLanguage);
  const [localDailyLimit, setLocalDailyLimit] = useState(storeDailyReviewLimit);

  // Whenever Modal is opened, reset the local state to the current value of the Store.
  useEffect(() => {
    if (isSettingModalOpen) {
      setLocalPreferredLang(storePreferredLang);
      setLocalUiLanguage(storeUiLanguage);
      setLocalDailyLimit(storeDailyReviewLimit);
    }
  }, [
    isSettingModalOpen,
    storePreferredLang,
    storeUiLanguage,
    storeDailyReviewLimit,
  ]);

  const handleSave = async () => {
    const limitToSave = Math.max(1, Math.min(200, Number(localDailyLimit)));

    setIsUpdating(true);

    const res = await updateUserPreferences({
      username,
      preferredLang: localPreferredLang,
      uiLanguage: localUiLanguage,
      dailyReviewLimit: limitToSave,
    });

    if (res.success) {
      // Only after the save operation is successful will the global Store be updated to trigger UI changes.
      setStoreLanguage(localUiLanguage);
      setStorePreferredLang(localPreferredLang);
      setStoreDailyReviewLimit(limitToSave);

      toast.success('settings.saveSuccess');
      setIsSettingModalOpen(false);
    } else {
      toast.error('settings.saveFailed');
    }

    setIsUpdating(false);
  };

  const isEn = localUiLanguage === 'en';

  return (
    <Dialog open={isSettingModalOpen} onOpenChange={setIsSettingModalOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-md rounded-[2rem] border border-white/40 shadow-2xl p-8 bg-white/85 backdrop-blur-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-300"
      >
        <DialogHeader className="mb-8">
          <DialogTitle className="text-2xl font-extrabold text-gray-900 text-center tracking-tight">
            {isEn ? 'General Settings' : '常规设置'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* username - Readonly */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 ml-1">
              <User size={14} /> {isEn ? 'Username' : '用户名'}
            </label>
            <div className="w-full h-[46px] px-5 py-4 bg-gray-100/50 border border-gray-200/60 rounded-2xl shadow-sm text-gray-600 font-medium font-mono text-sm">
              {username}
            </div>
          </div>

          {/* programming language */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 ml-1">
              <Code2 size={14} />
              {isEn ? 'Programming Language' : '首选编程语言'}
            </label>
            <Select
              value={localPreferredLang}
              onValueChange={setLocalPreferredLang}
            >
              <SelectTrigger className="w-full h-[46px]! px-5 bg-white border border-gray-200/60 rounded-2xl shadow-sm hover:border-[#ffa116]/50 focus:ring-2 focus:ring-[#ffa116]/20 transition-all outline-none font-medium text-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-gray-100 shadow-xl bg-white/90 backdrop-blur-xl">
                {LANGUAGES.map((lang) => (
                  <SelectItem
                    key={lang.label}
                    value={lang.value}
                    className="cursor-pointer py-3 rounded-xl focus:bg-orange-50 focus:text-[#ffa116] font-medium"
                  >
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Daily Review Limit */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 ml-1">
              <Layers size={14} />{' '}
              {isEn ? 'Daily Review Limit' : '每日复习上限'}
            </label>
            <div className="relative">
              <Input
                type="number"
                min={1}
                max={200}
                value={localDailyLimit}
                onChange={(e) => setLocalDailyLimit(Number(e.target.value))}
                className="w-full h-[46px] px-5 bg-white border border-gray-200/60 rounded-2xl shadow-sm hover:border-[#ffa116]/50 focus-visible:ring-2 focus-visible:ring-[#ffa116]/20 transition-all outline-none font-medium text-gray-800 pr-16"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium pointer-events-none">
                {isEn ? 'items' : '题'}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 ml-1">
              {isEn
                ? 'Maximum number of questions to review per day (1-200).'
                : '每天复习的最大题目数量 (1-200)。'}
            </p>
          </div>

          {/* UI language */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2 ml-1">
              <Globe size={14} /> {isEn ? 'Interface Language' : '界面语言'}
            </label>
            <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100/50 rounded-2xl">
              {(['en', 'zh'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLocalUiLanguage(lang)}
                  className={`py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out shadow-sm ${
                    localUiLanguage === lang
                      ? 'bg-white text-gray-900 shadow-md ring-1 ring-black/5'
                      : 'bg-transparent text-gray-400 hover:text-gray-600 shadow-none'
                  }`}
                >
                  {lang === 'en' ? 'English' : '简体中文'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isUpdating}
            className={`w-full py-4 mt-6 rounded-2xl font-bold transition-all duration-500 active:scale-[0.98] flex justify-center items-center text-white
            ${
              isUpdating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 bg-size-[200%_100%] bg-left hover:bg-right cursor-pointer'
            }
          `}
          >
            {isUpdating
              ? isEn
                ? 'Saving...'
                : '保存中...'
              : isEn
                ? 'Save Changes'
                : '保存设置'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
