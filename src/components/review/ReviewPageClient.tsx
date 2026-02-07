'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitReviewAction } from '@/actions/review';

import { toast } from 'sonner';

import { QuestionRowData } from '@/types';
import { ReviewTask, ReviewClientProps } from '@/types/review';
import { containerVariants } from '@/animations/reviewAnimations';

import { ReviewHeader } from './ReviewHeader';
import { ReviewEmptyState } from './ReviewEmptyState';
import { ReviewCard } from './ReviewCard';
import { QuestionPreviewModal } from '@/components/questions/QuestionPreviewModal';

export default function ReviewPageClient({
  initialReviews,
}: ReviewClientProps) {
  const [reviews, setReviews] = useState<ReviewTask[]>(initialReviews);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preview State
  const [previewData, setPreviewData] = useState<QuestionRowData | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Transform ReviewTask to QuestionRowData
  const handlePreview = (task: ReviewTask) => {
    // QuestionRowData temporary object
    const mappedData: QuestionRowData = {
      id: task.id,
      status: 'Review',
      masteryLevel: task.masteryLevel,
      notes: task.notes || null,
      updatedAt: new Date(),
      problem: {
        // this id is not used
        id: '0',
        pid: task.questionId,
        title: task.title,
        difficulty: task.difficulty,
        tags: task.tags || '',
        url: task.url || '',
      },
      submissions: task.submissions || [],
    };

    setPreviewData(mappedData);
    setIsPreviewOpen(true);
  };

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
            ? '🎉 Graduated! See you in a year!'
            : `Reviewed! Next session in ${days} days.`;
        toast.success(msg);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Review failed:', error);
      toast.error('Failed. Please try again.');
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
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8 md:space-y-12 pb-24 p-4 md:p-8 lg:p-10">
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
                  onPreview={() => handlePreview(task)}
                />
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <ReviewEmptyState />
          )}
        </AnimatePresence>
      </div>

      {/* modal */}
      {previewData && (
        <QuestionPreviewModal
          isOpen={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          data={previewData}
        />
      )}
    </div>
  );
}
