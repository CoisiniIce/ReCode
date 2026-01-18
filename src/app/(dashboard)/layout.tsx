import MainLayout from "@/components/layout/MainLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
}
