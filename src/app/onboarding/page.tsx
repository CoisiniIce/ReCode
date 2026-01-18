"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { registerUser } from "@/actions/register";
import { cn } from "@/lib/utils";

import { User, Code2, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OnboardingPage() {
  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    preferredLang: "typescript",
    uiLanguage: "en",
  });

  const t = {
    title:
      formData.uiLanguage === "en" ? "Welcome to ReCode" : "欢迎来到 ReCode",
    sub:
      formData.uiLanguage === "en"
        ? "Kickstart your smart practice in seconds"
        : "只需几步，开启你的智能刷题之旅",
    labelUser: formData.uiLanguage === "en" ? "Username" : "用户名",
    placeholderUser:
      formData.uiLanguage === "en" ? "What should I call you?" : "怎么称呼你？",
    labelLang:
      formData.uiLanguage === "en" ? "Programming Languages" : "编程语言",
    labelUI: formData.uiLanguage === "en" ? "Language" : "界面语言",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsPending(true);

    try {
      const res = await registerUser(formData);

      if (res?.error) {
        alert("创建失败: " + res.error);
        setIsPending(false);
      } else {
        setIsPending(false);
      }
    } catch (err) {
      console.error(err);
      setIsPending(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#f8f9fa] z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
        {/* 网格纹理覆盖层 */}
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-10 border border-white/60"
      >
        <div className="text-center mb-12">
          {/* Logo placeholder */}
          <div className="inline-flex p-3 bg-gray-900 text-white rounded-2xl mb-6 shadow-xl rotate-3">
            <Code2 size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {t.title}
          </h1>
          <p className="text-gray-500 mt-3 text-lg font-medium opacity-80">
            {t.sub}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* username */}
          <div className="space-y-3 group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <User
                size={14}
                className="group-focus-within:text-[#ffa116] transition-colors"
              />
              {t.labelUser}
            </label>
            <input
              required
              className="w-full px-5 py-4 bg-white/50 border border-transparent rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white focus:border-[#ffa116]/30 outline-none transition-all placeholder:text-gray-300 shadow-sm text-gray-900 font-medium"
              placeholder={t.placeholderUser}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          {/* programming language */}
          <div className="space-y-3 group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Code2
                size={14}
                className="group-focus-within:text-[#ffa116] transition-colors"
              />
              {t.labelLang}
            </label>
            <Select
              value={formData.preferredLang}
              onValueChange={(val) =>
                setFormData({ ...formData, preferredLang: val })
              }
            >
              <SelectTrigger className="w-full h-[60px] px-5 bg-white/50 border-transparent rounded-2xl focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm font-medium">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-white/40 bg-white/90 backdrop-blur-xl shadow-2xl">
                {["typescript", "javascript", "python", "cpp", "java","go"].map(
                  (lang) => (
                    <SelectItem
                      key={lang}
                      value={lang}
                      className="rounded-xl py-3 cursor-pointer"
                    >
                      <span className="capitalize">
                        {lang === "cpp" ? "C++" : lang}
                      </span>
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* UI language */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Globe size={14} /> {t.labelUI}
            </label>
            <div className="grid grid-cols-2 gap-4 p-1.5 bg-gray-100/50 rounded-[1.25rem] inner-shadow">
              {["en", "zh"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setFormData({ ...formData, uiLanguage: lang })}
                  className={`py-3 rounded-xl transition-all font-bold text-sm ${
                    formData.uiLanguage === lang
                      ? "bg-white text-gray-900 shadow-md ring-1 ring-black/5 scale-[1.02]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {lang === "en" ? "English" : "简体中文"}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "relative w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 hover:shadow-2xl hover:shadow-gray-300 transition-all active:scale-[0.98] overflow-hidden group",
              isPending ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            )}
          >
            {/* animation */}
            {!isPending && (
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
            )}

            <span className="relative z-10">
              {isPending
                ? formData.uiLanguage === "en"
                  ? "Creating..."
                  : "创建中..."
                : formData.uiLanguage === "en"
                ? "Start Journey"
                : "开始使用"}
            </span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
