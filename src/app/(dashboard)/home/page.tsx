import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

import HomePageClient from "@/components/home/HomePageClient";

import type { FocusTaskItem, MasteryDistributionItem } from "@/types";
import { MASTERY_COLORS } from "@/constants";

const getHomePageData = async (userId: string) => {
  const now = new Date();

  // Calculate the date 7 days ago for the purpose of calculating the Trend
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    rawFocusTasks,
    rawDistribution,
    masteredCount,
    masteredThisWeek,
    totalQuestionsCount,
    totalQuestionsThisWeek,
    reviewCount,
  ] = await Promise.all([
    // for Focus Tasks
    prisma.progress.findMany({
      where: {
        userId: userId,
        nextReview: { lte: now },
        status: { not: "Todo" },
      },
      include: { problem: true },
      orderBy: { nextReview: "asc" },
      take: 2
    }),

    // Used for calculating the weighted average mastery rate
    prisma.progress.groupBy({
      by: ["masteryLevel"],
      where: { userId: userId },
      _count: { _all: true },
    }),

    // Level >= 4
    prisma.progress.count({
      where: {
        userId: userId,
        masteryLevel: { gte: 4 },
      },
    }),

    // The newly added high-skilled questions this week
    prisma.progress.count({
      where: {
        userId: userId,
        masteryLevel: { gte: 4 },
        updatedAt: { gte: sevenDaysAgo },
      },
    }),

    // Total solved
    prisma.progress.count({
      where: { userId: userId },
    }),

    // New questions added this week
    prisma.progress.count({
      where: {
        userId: userId,
        createdAt: { gte: sevenDaysAgo },
      },
    }),

    // Wait to review
    prisma.progress.count({
      where: {
        userId: userId,
        nextReview: { lte: now },
        status: { not: "Todo" },
      },
    }),
  ]);

  // Format
  // format Focus Tasks
  const focusTasks: FocusTaskItem[] = rawFocusTasks.map((p) => ({
    id: p.problem.id,
    title: p.problem.title,
    difficulty: p.problem.difficulty,
  }));

  // format mastery bar
  const masteryDistribution: MasteryDistributionItem[] = Array.from({
    length: 6,
  }).map((_, level) => {
    const found = rawDistribution.find((d) => d.masteryLevel === level);
    return {
      level: level,
      count: found ? found._count._all : 0,
      label: `L${level}`,
      color: MASTERY_COLORS[level] || "#cbd5e1",
    };
  });

  // calculate mastery rate
  const totalTracked = rawDistribution.reduce(
    (acc, curr) => acc + curr._count._all,
    0
  );

  const totalWeightedScore = rawDistribution.reduce((acc, curr) => {
    const weight = curr.masteryLevel / 5;
    return acc + curr._count._all * weight;
  }, 0);

  const masteryRate =
    totalTracked > 0
      ? Math.round((totalWeightedScore / totalTracked) * 100)
      : 0;

  return {
    focusTasks,
    masteryDistribution,
    stats: {
      masteredCount,
      masteredTrend: masteredThisWeek,
      totalQuestions: totalQuestionsCount,
      questionsTrend: totalQuestionsThisWeek,
      toReview: reviewCount,
      masteryRate: masteryRate,
    },
  };
};

const HomePage = async () => {
  const user = await prisma.user.findFirst();

  if (!user) {
    redirect("/onboarding");
  }

  const { focusTasks, masteryDistribution, stats } = await getHomePageData(
    user.id
  );

  return (
    <HomePageClient
      focusTasks={focusTasks}
      masteryDistribution={masteryDistribution}
      stats={stats}
    />
  );
};

export default HomePage;
