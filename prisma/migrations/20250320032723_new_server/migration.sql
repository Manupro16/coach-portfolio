/*
  Warnings:

  - Added the required column `contentSubtitle` to the `WelcomeContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentTitle` to the `WelcomeContent` table without a default value. This is not possible if the table is not empty.
  - Made the column `subtitle` on table `WelcomeContent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WelcomeContent" ADD COLUMN     "contentSubtitle" TEXT NOT NULL,
ADD COLUMN     "contentTitle" TEXT NOT NULL,
ALTER COLUMN "subtitle" SET NOT NULL;
