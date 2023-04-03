-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_profileId_fkey`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
