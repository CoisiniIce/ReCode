"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export default function DashboardStateInitializer({ user }: { user: any }) {
  const { setLanguage, setUsername, setPreferredLang } = useUserStore();

  useEffect(() => {
    if (user) {
      setLanguage(user.uiLanguage);
      setUsername(user.username);
      setPreferredLang(user.preferredLang);
    }
  }, [user, setLanguage, setUsername, setPreferredLang]);

  return null;
}
