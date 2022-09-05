/*
  Warnings:

  - Added the required column `rank` to the `MatchRanking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchRanking" ADD COLUMN     "rank" DOUBLE PRECISION NOT NULL;
