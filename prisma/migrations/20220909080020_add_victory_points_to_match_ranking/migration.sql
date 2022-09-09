-- AlterTable
ALTER TABLE "Corporation" ADD COLUMN     "wins" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "MatchRanking" ADD COLUMN     "victoryPoints" INTEGER;
