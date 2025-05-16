// app/components/home/WelcomeSection.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import WelcomeSectionClient from "./client/WelcomeSectionClient";
import { TopWave, BottomWave } from "@/app/components/svgWaves";

export const dynamic = "force-dynamic";

export default async function WelcomeSection() {
  const [data, session] = await Promise.all([
    prisma.welcomeContent.findFirst(),
    getServerSession(authOptions),
  ]);

  return (
    <>
      <TopWave />
      <WelcomeSectionClient data={data} session={session} />
      <BottomWave />
    </>
  );
}
