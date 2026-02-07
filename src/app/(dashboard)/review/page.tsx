import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import ReviewPageClient from "@/components/review/ReviewPageClient";
import { ReviewTask } from "@/types/review";

export default async function ReviewPage() {
  const user = await prisma.user.findFirst();
  if (!user) {
    redirect("/onboarding");
  }

  const now = new Date();

  const limit = user.dailyReviewLimit || 50;

  // Query pending review tasks
  // Condition: The status is not "Todo" and the next review time is less than or equal to the current time.
  const rawReviews = await prisma.progress.findMany({
    where: {
      userId: user.id,
      status: { not: "Todo" },
      nextReview: { lte: now },
    },
    include: {
      problem: true,
    },
    orderBy: {
      nextReview: "asc",
    },
    // Limit the number of items loaded at one time
    take: limit,
  });

  const reviews: ReviewTask[] = rawReviews.map((p) => ({
    id: p.id,
    questionId: p.problem.pid,
    title: p.problem.title,
    difficulty: p.problem.difficulty,
    url: p.problem.url,
    slug: p.problem.slug,
    masteryLevel: p.masteryLevel,
    // Format the date to avoid serialization issues
    lastReviewDate: p.lastReview
      ? p.lastReview.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : null,
  }));

  return <ReviewPageClient initialReviews={reviews} />;
}
