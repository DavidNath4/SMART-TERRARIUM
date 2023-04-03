/*
  Warnings:

  - Made the column `profileId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_profileId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `profileId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
