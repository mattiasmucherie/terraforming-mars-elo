/*
  Warnings:

  - Added the required column `standing` to the `MatchRanking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchRanking" ADD COLUMN     "standing" INTEGER NOT NULL;
