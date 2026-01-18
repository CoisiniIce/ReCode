export const SRS_CONFIG = {
  GRADUATION_INTERVAL: 365, // 超过 365 天不再复习，视为"毕业"
  MIN_EASINESS: 1.3, // 最小易读度（防止题目变得太难导致死循环）
  BONUS_EASINESS_HARD: -0.2, // Hard 题目的初始惩罚
  BONUS_EASINESS_EASY: 0.2, // Easy 题目的初始奖励
};

interface SrsInput {
  currentInterval: number; // 当前间隔 (天)
  currentEasiness: number; // 当前易读度 (E-Factor)
  grade: number; // 用户评分 (0-5)
  difficulty: string; // 题目原始难度 (Easy/Medium/Hard)
  reviewCount: number; // 已复习次数
}

interface SrsOutput {
  nextInterval: number;
  nextEasiness: number;
  status: "Reviewing" | "Mastered" | "Solved"; // Solved 是为了保持类型兼容，实际逻辑中可作为过渡
}

/**
 * 核心 SRS 迭代计算函数
 */
export function calculateNextReview({
  currentInterval,
  currentEasiness,
  grade,
  difficulty,
  reviewCount,
}: SrsInput): SrsOutput {
  let nextInterval: number;
  let nextEasiness: number = currentEasiness;

  // 1. 处理评分逻辑
  if (grade >= 3) {
    // === 成功回忆 ===

    // A. 第一次复习 (或 ReviewCount=0)
    if (reviewCount === 0 || currentInterval === 0) {
      nextInterval = 1;

      // 根据题目原始难度调整初始 E-Factor
      if (difficulty === "Hard") nextEasiness -= 0.2;
      if (difficulty === "Easy") nextEasiness += 0.2;
    }
    // B. 第二次复习
    else if (reviewCount === 1) {
      nextInterval = 6;
    }
    // C. 后续复习 (核心公式)
    else {
      // 标准 SM-2 E-Factor 更新公式
      // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
      const change = 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02);
      nextEasiness = currentEasiness + change;

      // 间隔计算：I(n) = I(n-1) * EF
      nextInterval = Math.ceil(currentInterval * nextEasiness);

      // 模糊因子 (Fuzzing)：加入 -5% 到 +5% 的随机波动，防止堆积
      // 只有间隔大于 10 天才应用，避免短期复习乱序
      if (nextInterval > 10) {
        const fuzz = 0.95 + Math.random() * 0.1; // 0.95 ~ 1.05
        nextInterval = Math.ceil(nextInterval * fuzz);
      }
    }
  } else {
    // === 忘记了 (Grade 0-2) ===

    // 现实机制：不直接重置为 0，而是保留一定比例 (比如 20%)，避免挫败感太强
    // 或者按照经典 Anki 逻辑：重置为 1，但保留 E-Factor 稍微降低
    nextInterval = 1;
    nextEasiness = Math.max(SRS_CONFIG.MIN_EASINESS, currentEasiness - 0.2);
  }

  // 2. 边界值保护
  if (nextEasiness < SRS_CONFIG.MIN_EASINESS) {
    nextEasiness = SRS_CONFIG.MIN_EASINESS;
  }

  // 3. 毕业机制检查
  let status: SrsOutput["status"] = "Reviewing";

  if (nextInterval >= SRS_CONFIG.GRADUATION_INTERVAL) {
    status = "Mastered";
    nextInterval = SRS_CONFIG.GRADUATION_INTERVAL;
  }

  return { nextInterval, nextEasiness, status };
}
