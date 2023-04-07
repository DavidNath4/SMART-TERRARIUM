/*
  Warnings:

  - Made the column `deviceId` on table `history` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_deviceId_fkey`;

-- AlterTable
ALTER TABLE `history` MODIFY `temp` VARCHAR(191) NULL,
    MODIFY `humd` VARCHAR(191) NULL,
    MODIFY `uv` BOOLEAN NULL,
    MODIFY `food` BOOLEAN NULL,
    MODIFY `drink` BOOLEAN NULL,
    MODIFY `deviceId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
