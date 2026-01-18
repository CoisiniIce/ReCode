import { create } from "zustand";
import { type UserState } from "@/types";

export const useUserStore = create<UserState>((set) => ({
  uiLanguage: "zh",
  themeColor: "emerald",
  username: "No username",
  preferredLang: "typescript",
  isSettingModalOpen: false,

  setLanguage: (lang) => set({ uiLanguage: lang }),
  setTheme: (color) => set({ themeColor: color }),
  setUsername: (name) => set({ username: name }),
  setPreferredLang: (preLang) => set({ preferredLang: preLang }),
  setIsSettingModalOpen: (status: boolean) => set({ isSettingModalOpen: status }),
}));
