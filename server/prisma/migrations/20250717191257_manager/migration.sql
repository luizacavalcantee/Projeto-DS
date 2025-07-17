-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_managerId_fkey";

-- AlterTable
ALTER TABLE "Challenge" ALTER COLUMN "managerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "SchoolManager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
