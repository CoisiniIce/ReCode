import { type LucideIcon } from "lucide-react";
import { LanguageType } from "@/constants/languages";

// SideBar interfaces
interface NavItem {
  en_name: string;
  zh_name: string;
  icon: LucideIcon;
  path: string;
}

export interface NavSection {
  category: string;
  items: NavItem[];
}

// useUserStore interfaces
export interface UserState {
  uiLanguage: LanguageType;
  themeColor: string;
  username: string;
  preferredLang: string;
  isSettingModalOpen: boolean;

  setLanguage: (lang: LanguageType) => void;
  setTheme: (color: string) => void;
  setUsername: (name: string) => void;
  setPreferredLang: (preLang: string) => void;
  setIsSettingModalOpen: (status: boolean) => void;
}

// updateUsers interfaces
export interface UpdateUserProps {
  username: string;
  preferredLang: string;
  uiLanguage: string;
}

// register interfaces
export interface registerUserProps {
  username: string;
  preferredLang: string;
  uiLanguage: string;
}

// StatCard interfaces
export type CardVariant = "orange" | "green" | "blue" | "purple";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;

  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  footerText?: string;
  variant?: CardVariant;
  onClick?: () => void;
  className?: string;
}

// MasteryBar interfaces
export interface MasteryDistributionItem {
  level: number;
  count: number;
  label: string;
  color: string;
}

export interface MasteryBarProps {
  distribution: MasteryDistributionItem[];
}

// TodayFocus interfaces
export interface FocusTaskItem {
  id: string;
  title: string;
  difficulty: string;
}

interface HomePageStats {
  masteredCount: number;
  masteredTrend: number;
  totalQuestions: number;
  questionsTrend: number;
  toReview: number;
  masteryRate: number;
}

export interface HomePageClientProps {
  focusTasks: FocusTaskItem[];
  masteryDistribution: MasteryDistributionItem[];
  stats: HomePageStats;
}

export interface TodayFocusProps {
  focusTasks?: FocusTaskItem[] | null;
  totalTasks: number;
}

// Questions interfaces
export interface QuestionRowData {
  id: string;
  status: string;
  masteryLevel: number;
  notes: string | null;
  updatedAt: Date;

  problem: {
    id: string;
    pid: string;
    title: string;
    difficulty: string;
    tags: string;
    url: string;
  };

  // recent Submission (for review)
  submissions: {
    language: string;
    code: string;
  }[];
}

export interface QuestionsPageClientProps {
  initialQuestions: QuestionRowData[];
}
