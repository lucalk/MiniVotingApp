/*
  Warnings:

  - You are about to drop the column `descritpion` on the `poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `poll` DROP COLUMN `descritpion`,
    ADD COLUMN `description` VARCHAR(191) NULL;
