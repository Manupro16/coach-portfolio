-- CreateTable
CREATE TABLE "AboutHero" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "fullName" TEXT NOT NULL,
    "nickname" TEXT,
    "headline" TEXT,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutHero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutHeroImage" (
    "id" SERIAL NOT NULL,
    "aboutHeroId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "AboutHeroImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutStory" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutStory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AboutHeroImage_aboutHeroId_order_idx" ON "AboutHeroImage"("aboutHeroId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "AboutStory_slug_key" ON "AboutStory"("slug");

-- CreateIndex
CREATE INDEX "AboutStory_order_idx" ON "AboutStory"("order");

-- AddForeignKey
ALTER TABLE "AboutHeroImage" ADD CONSTRAINT "AboutHeroImage_aboutHeroId_fkey" FOREIGN KEY ("aboutHeroId") REFERENCES "AboutHero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
