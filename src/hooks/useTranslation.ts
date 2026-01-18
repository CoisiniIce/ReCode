import { useUserStore } from "@/store/useUserStore";
import {
  TRANSLATIONS,
  type LanguageType,
  type TranslationKeys,
} from "@/constants/languages";

export function useTranslation() {
  const { uiLanguage } = useUserStore();

  // The parameters passed on are in the form of "common.backhome"
  const t = (path: TranslationKeys) => {
    const keys = path.split(".");
    let result: any = TRANSLATIONS[uiLanguage as LanguageType];

    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path;
      }
    }
    return result || path;
  };

  return { t, lang: uiLanguage };
}
