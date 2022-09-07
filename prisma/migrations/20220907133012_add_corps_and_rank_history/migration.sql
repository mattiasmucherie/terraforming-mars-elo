/*
  Warnings:

  - You are about to drop the column `rank` on the `MatchRanking` table. All the data in the column will be lost.
  - Added the required column `newRank` to the `MatchRanking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prevRank` to the `MatchRanking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchRanking" DROP COLUMN "rank",
ADD COLUMN     "corporationId" TEXT,
ADD COLUMN     "newRank" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "prevRank" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Corporation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Corporation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Corporation_name_key" ON "Corporation"("name");

-- AddForeignKey
ALTER TABLE "MatchRanking" ADD CONSTRAINT "MatchRanking_corporationId_fkey" FOREIGN KEY ("corporationId") REFERENCES "Corporation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
