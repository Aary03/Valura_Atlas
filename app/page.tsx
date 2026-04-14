export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LandingPage from "@/components/LandingPage";

export const metadata = {
  title: "Valura Atlas — The world is your portfolio.",
  description:
    "Structured learning for Indian investors who want to grow beyond borders. Free with your Valura account.",
};

export default async function RootPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/explore");
  return <LandingPage />;
}
