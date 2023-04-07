-- DropForeignKey
ALTER TABLE `device` DROP FOREIGN KEY `Device_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Device` ADD CONSTRAINT `Device_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
