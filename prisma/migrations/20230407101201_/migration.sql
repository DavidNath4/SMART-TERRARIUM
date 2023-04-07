-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_deviceId_fkey`;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
