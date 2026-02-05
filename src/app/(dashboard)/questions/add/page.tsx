import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

import AddQuestionContainer from "@/components/questions/AddQuestionContainer";

export default async function QuestionAddPage() {
  const user = await prisma.user.findFirst();

  if (!user) {
    redirect("/onboarding");
  }

  return <AddQuestionContainer preferredLang={user.preferredLang} />;
}
