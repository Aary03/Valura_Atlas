import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userName = session.user?.name || session.user?.email || "User";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F7FA" }}>
      <Navbar userName={userName} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
