"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "sonner";

import { ReviewTask, ReviewClientProps } from "@/types/review";
import { submitReviewAction } from "@/actions/review";

import { ReviewHeader } from "./ReviewHeader";
import { ReviewEmptyState } from "./ReviewEmptyState";
import { ReviewCard } from "./ReviewCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 },
};

export default function ReviewPageClient({
  initialReviews,
}: ReviewClientProps) {
  const [reviews, setReviews] = useState<ReviewTask[]>(initialReviews);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // rate
  const handleRate = async (taskId: string, score: number) => {
    setIsSubmitting(true);

    // Optimistic Update
    const taskToRate = reviews.find((t) => t.id === taskId);
    setReviews((prev) => prev.filter((t) => t.id !== taskId));
    setActiveTaskId(null);

    try {
      const result = await submitReviewAction(taskId, score);

      if (result.success) {
        const days = result.interval;
        const msg =
          days! >= 365
            ? "🎉 Graduated! See you in a year!"
            : `Reviewed! Next session in ${days} days.`;
        toast.success(msg);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Review failed:", error);
      toast.error("Failed. Please try again.");
      // Failure rollback
      if (taskToRate) {
        setReviews((prev) => [taskToRate, ...prev]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.7]"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12 pb-24 p-6 md:p-12">
        {/* Header */}
        <ReviewHeader reviews={reviews} />

        {/* Review List */}
        <AnimatePresence mode="wait">
          {reviews.length > 0 ? (
            <motion.div
              key="list"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-6"
            >
              {reviews.map((task) => (
                <ReviewCard
                  key={task.id}
                  task={task}
                  isActive={activeTaskId === task.id}
                  isSubmitting={isSubmitting}
                  onActivate={() => setActiveTaskId(task.id)}
                  onCancel={() => setActiveTaskId(null)}
                  onRate={(score) => handleRate(task.id, score)}
                />
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <ReviewEmptyState />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
