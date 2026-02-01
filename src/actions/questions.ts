"use server";

import { prisma } from "@/lib/db";
import { EditorFormData } from "@/types/editor";
import { revalidatePath } from "next/cache";
import { getNextReviewDate } from "@/lib/utils";

function mapDifficultyToLevel(diff: string): number {
  switch (diff) {
    case "Easy":
      return 1;
    case "Medium":
      return 2;
    case "Hard":
      return 3;
    default:
      return 1;
  }
}

const getInitialEasiness = (diff: string) => {
  if (diff === "Hard") return 2.4;
  if (diff === "Easy") return 2.6;
  return 2.5;
};

export async function saveQuestionAction(formData: EditorFormData) {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return { success: false, error: "Unauthorized: No user found" };
    }

    const now = new Date();
    const nextReviewDate = getNextReviewDate(1);

    await prisma.$transaction(async (tx) => {
      // process Problem
      const problem = await tx.problem.upsert({
        where: {
          platform_pid: {
            platform: "LEETCODE",
            pid: formData.pid,
          },
        },
        update: {
          title: formData.title,
          difficulty: formData.difficulty,
          difficultyLevel: mapDifficultyToLevel(formData.difficulty),
          tags: formData.tags.join(","),
          url: formData.link,
        },
        create: {
          platform: "LEETCODE",
          pid: formData.pid,
          title: formData.title,
          difficulty: formData.difficulty,
          difficultyLevel: mapDifficultyToLevel(formData.difficulty),
          tags: formData.tags.join(","),
          url: formData.link,
        },
      });

      // process Progress
      const progress = await tx.progress.upsert({
        where: {
          userId_problemId: {
            userId: user.id,
            problemId: problem.id,
          },
        },
        // Only update "Last Viewed Time", indicating that you have interacted with this question today.
        // The content of the editing does not reset the review plan, unless the score is changed on the Review page.
        update: {
          status: formData.masteryLevel === 5 ? "Solved" : "Reviewing",
          masteryLevel: formData.masteryLevel,
          notes: formData.notes,
          lastReview: now,
        },
        // Creating the question itself counts as the first attempt, with an initial interval of 1 day.
        create: {
          userId: user.id,
          problemId: problem.id,
          status: "Reviewing",
          masteryLevel: formData.masteryLevel,
          notes: formData.notes,

          reviewCount: 1,
          interval: 1,
          easiness: getInitialEasiness(formData.difficulty),

          lastReview: now,
          nextReview: nextReviewDate,
        },
      });

      // process Submission
      if (formData.code && formData.code.trim() !== "") {
        await tx.submission.create({
          data: {
            progressId: progress.id,
            language: formData.language,
            code: formData.code,
            isMain: true,
          },
        });
      }
    });

    revalidatePath("/questions");
    revalidatePath("/review");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    console.error("Failed to save question:", error);
    return { success: false, error: "Failed to save data to database." };
  }
}

export async function deleteQuestionAction(progressId: string) {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.$transaction(async (tx) => {
      const progress = await tx.progress.findUnique({
        where: { id: progressId },
        select: { id: true, userId: true, problemId: true },
      });

      if (!progress || progress.userId !== user.id) {
        throw new Error("Record not found or access denied");
      }

      await tx.submission.deleteMany({
        where: { progressId: progressId },
      });

      await tx.progress.delete({
        where: { id: progressId },
      });

      // Orphan Cleanup
      const remainingUsageCount = await tx.progress.count({
        where: {
          problemId: progress.problemId,
        },
      });

      if (remainingUsageCount === 0) {
        await tx.problem.delete({
          where: { id: progress.problemId },
        });
      }
    });

    revalidatePath("/questions");
    revalidatePath("/review");
    revalidatePath("/home");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete question:", error);
    return { success: false, error: "Failed to delete question." };
  }
}
