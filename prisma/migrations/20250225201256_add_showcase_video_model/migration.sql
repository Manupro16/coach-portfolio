-- CreateTable
CREATE TABLE "ShowcaseVideo" (
    "id" SERIAL NOT NULL,
    "team" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "videoSrc" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShowcaseVideo_pkey" PRIMARY KEY ("id")
);
