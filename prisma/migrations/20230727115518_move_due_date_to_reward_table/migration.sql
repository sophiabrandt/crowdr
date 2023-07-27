/*
  Warnings:

  - You are about to drop the column `expected_due` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "expected_due";

-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "expected_due" TIMESTAMP(3);
