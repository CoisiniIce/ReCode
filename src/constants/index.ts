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

export const STATCARD_COLOR_VARIANTS: Record<string, string> = {
  orange: "from-orange-400 to-orange-600 shadow-orange-500/30",
  blue: "from-blue-500 to-indigo-600 shadow-blue-500/30",
  purple: "from-purple-500 to-fuchsia-600 shadow-purple-500/30",
  green: "from-emerald-400 to-teal-600 shadow-emerald-500/30",
};

export const MASTERY_COLORS: Record<number, string> = {
  0: "#ef4444",
  1: "#f97316",
  2: "#facc15",
  3: "#a3e635",
  4: "#22c55e",
  5: "#15803d",
};

// Programming languages ​​supported in edit notes
export const LANGUAGES = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export const STATUS_OPTIONS = ["Reviewing", "Solved", "Todo"];
