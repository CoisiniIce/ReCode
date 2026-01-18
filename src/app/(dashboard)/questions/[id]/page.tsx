import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import QuestionEditor from "@/components/questions/QuestionEditor";
import { EditorFormData } from "@/types/editor";

interface QuestionEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuestionEditPage({
  params,
}: QuestionEditPageProps) {
  const user = await prisma.user.findFirst();
  if (!user) {
    redirect("/onboarding");
  }

  const { id } = await params;

  // get the recent submission
  const progress = await prisma.progress.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
    include: {
      problem: true,
      submissions: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!progress) {
    redirect("/questions");
  }

  const initialData: EditorFormData = {
    pid: progress.problem.pid,
    title: progress.problem.title,
    difficulty: progress.problem.difficulty,
    // the data in database is "DP,Array", tansform to array
    tags: progress.problem.tags ? progress.problem.tags.split(",") : [],
    link: progress.problem.url || "",
    language: progress.submissions[0]?.language || user.preferredLang,
    code: progress.submissions[0]?.code || "",
    masteryLevel: progress.masteryLevel,
    notes: progress.notes || "",
  };

  return (
    <QuestionEditor
      mode="edit"
      initialData={initialData}
      preferredLang={user.preferredLang}
    />
  );
}
