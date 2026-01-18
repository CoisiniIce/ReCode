import { LayoutGrid, ListTodo, BarChart2, HelpCircle } from "lucide-react";

import type { CardVariant, NavSection } from "@/types";

export const SIDEBAR_NAV: NavSection[] = [
  {
    category: "Overview",
    items: [
      { en_name: "Home", zh_name: "主页", icon: LayoutGrid, path: "/home" },
      {
        en_name: "Questions",
        zh_name: "问题列表",
        icon: ListTodo,
        path: "/questions",
      },
      { en_name: "Review", zh_name: "复习", icon: BarChart2, path: "/review" },
    ],
  },
  {
    category: "System",
    items: [
      { en_name: "Help", zh_name: "帮助", icon: HelpCircle, path: "/help" },
    ],
  },
];

export const STATCARD_COLOR_VARIANTS: Record<CardVariant, string> = {
  orange: "from-[#ffb545] to-[#df8c11] shadow-orange-900/20",
  green: "from-[#52B788] to-[#2D6A4F] shadow-emerald-900/20",
  blue: "from-[#4facfe] to-[#00f2fe] shadow-blue-900/20",
  purple: "from-[#a18cd1] to-[#fbc2eb] shadow-purple-900/20",
};

export const MASTERY_COLORS_1: Record<number, string> = {
  0: "#ef4444",
  1: "#f97316",
  2: "#facc15",
  3: "#a3e635",
  4: "#22c55e",
  5: "#15803d",
};

export const MASTERY_COLORS_2: Record<number, string> = {
  0: "#FDA4AF",
  1: "#FED7AA",
  2: "#FEF08A",
  3: "#D9F99D",
  4: "#86EFAC",
  5: "#4ADE80",
};

// Programming languages ​​supported in edit notes
export const LANGUAGES = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
];

export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export const STATUS_OPTIONS = ["Reviewing", "Solved", "Todo"];