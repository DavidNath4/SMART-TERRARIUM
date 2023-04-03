/*
  Warnings:

  - You are about to drop the column `profileId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_profileId_fkey`;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `profileId`;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
