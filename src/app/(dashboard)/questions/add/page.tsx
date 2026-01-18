import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

import QuestionEditor from "@/components/questions/QuestionEditor";

export default async function QuestionAddPage() {
  const user = await prisma.user.findFirst();

  if (!user) {
    redirect("/onboarding");
  }

  return <QuestionEditor mode="create" preferredLang={user.preferredLang} />;
}
