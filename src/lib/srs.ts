/**
 * Configuration constants for the Spaced Repetition System (SRS)
 */
export const SRS_CONFIG = {
  /** The interval threshold in days to mark a task as fully mastered */
  GRADUATION_INTERVAL: 365,
  /** The floor value for the E-Factor to prevent the repetition spiral */
  MIN_EASINESS: 1.3,
  /** Initial E-Factor decrement for items categorized as high difficulty */
  BONUS_EASINESS_HARD: -0.2,
  /** Initial E-Factor increment for items categorized as low difficulty */
  BONUS_EASINESS_EASY: 0.2,
};

interface SrsInput {
  /** Current review interval measured in days */
  currentInterval: number;
  /** Current Easiness Factor (E-Factor) determining the growth rate of intervals */
  currentEasiness: number;
  /** User performance rating typically ranging from 0 to 5 */
  grade: number;
  /** The intrinsic difficulty level of the material */
  difficulty: string;
  /** Total number of successful review sessions completed */
  reviewCount: number;
}

interface SrsOutput {
  /** Calculated interval for the next review session */
  nextInterval: number;
  /** Updated Easiness Factor based on the latest performance */
  nextEasiness: number;
  /** The lifecycle status of the item within the SRS pipeline */
  status: "Reviewing" | "Mastered" | "Solved";
}

/**
 * Calculates the next review parameters using an optimized SM-2 algorithmic approach.
 * * The algorithm applies a deterministic step-sequence for early-stage reviews and 
 * transitions to an E-Factor multiplication model for mature items. It incorporates 
 * a fuzzing mechanism for long-term intervals to prevent review load spikes and 
 * enforces boundary constraints to ensure scheduled sustainability.
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

  /**
   * Logical branch for successful recall (Positive feedback)
   */
  if (grade >= 3) {
    /**
     * Initial learning phase or first-time interaction
     */
    if (reviewCount === 0 || currentInterval === 0) {
      nextInterval = 1;

      /**
       * Adjust initial E-Factor based on the intrinsic difficulty of the task
       */
      if (difficulty === "Hard") nextEasiness -= 0.2;
      if (difficulty === "Easy") nextEasiness += 0.2;
    }
    /**
     * Second stage of the learning ramp
     */
    else if (reviewCount === 1) {
      nextInterval = 6;
    }
    /**
     * Mature review phase utilizing the core SM-2 interval expansion formula
     */
    else {
      /**
       * Update the E-Factor based on the user's performance grade
       * Formula: EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
       */
      const change = 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02);
      nextEasiness = currentEasiness + change;

      /**
       * Interval calculation: I(n) = I(n-1) * EF
       */
      nextInterval = Math.ceil(currentInterval * nextEasiness);

      /**
       * Apply a random jitter (Fuzzing) between -5% and +5% to intervals exceeding 10 days
       * to distribute the review load across the calendar.
       */
      if (nextInterval > 10) {
        const fuzz = 0.95 + Math.random() * 0.1;
        nextInterval = Math.ceil(nextInterval * fuzz);
      }
    }
  } else {
    /**
     * Logical branch for recall failure (Negative feedback)
     * Resets the interval while applying a penalty to the Easiness Factor.
     */
    nextInterval = 1;
    nextEasiness = Math.max(SRS_CONFIG.MIN_EASINESS, currentEasiness - 0.2);
  }

  /**
   * Enforce the minimum E-Factor boundary constraint
   */
  if (nextEasiness < SRS_CONFIG.MIN_EASINESS) {
    nextEasiness = SRS_CONFIG.MIN_EASINESS;
  }

  /**
   * Evaluate the graduation criteria to determine if the item is mastered
   */
  let status: SrsOutput["status"] = "Reviewing";

  if (nextInterval >= SRS_CONFIG.GRADUATION_INTERVAL) {
    status = "Mastered";
    nextInterval = SRS_CONFIG.GRADUATION_INTERVAL;
  }

  return { nextInterval, nextEasiness, status };
}