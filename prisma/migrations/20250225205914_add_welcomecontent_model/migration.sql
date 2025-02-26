-- CreateTable
CREATE TABLE "WelcomeContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "imageUrl" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WelcomeContent_pkey" PRIMARY KEY ("id")
);
