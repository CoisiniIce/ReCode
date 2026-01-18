import type { Metadata } from "next";
import "@/styles/globals.css";

import { prisma } from "@/lib/db";
import OnboardingPage from "@/app/onboarding/page";
import DashboardStateInitializer from "@/components/layout/DashboardStateInitializer";

export const metadata: Metadata = {
  title: "ReCode",
  description:
    "A problem-solving progress management tool based on the Ebbinghaus Forgetting Curve",
  robots: { index: false, follow: false },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await prisma.user.findFirst();

  return (
    <html lang="zh-CN">
      <body className="antialiased bg-gray-50 text-gray-900 selection:bg-[#ffa116] selection:text-white">
        {user ? (
          <>
            <DashboardStateInitializer user={user} />
            {children}
          </>
        ) : (
          <OnboardingPage />
        )}
      </body>
    </html>
  );
}
