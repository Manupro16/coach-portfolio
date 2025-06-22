// app/components/home/ShowcaseSection.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ShowcaseSectionClient from "./client/ShowcaseSectionClient";
import { TopWave, BottomWave } from "@/app/components/svgWaves";

export default async function ShowCaseSection() {
  const [data, session] = await Promise.all([
    prisma.showcaseVideo.findMany({ orderBy: { createdAt: "desc" } }),
    getServerSession(authOptions),
  ]);

  return (
    <>
      <TopWave />
      <ShowcaseSectionClient data={data} session={session} />
      <BottomWave />
    </>
  );
}