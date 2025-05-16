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



// const showcases = [
//     {
//         team: 'Zamora FC Venezuela',
//         season: '2010/2011',
//         videoSrc: '/videos/zamora_2010.mp4',
//         description: 'Highlights from the 2010/2011 season.',
//     },
//     {
//         team: 'Estudiantes de Mérida',
//         season: '2012/2013',
//         videoSrc: '/videos/estudiantes_2012.mp4',
//         description: 'Key moments from the 2012/2013 season.',
//     },
//     {
//         team: 'Deportivo Táchira',
//         season: '2014/2015',
//         videoSrc: '/videos/tachira_2014.mp4',
//         description: 'Memorable plays from the 2014/2015 season.',
//     },
// ];