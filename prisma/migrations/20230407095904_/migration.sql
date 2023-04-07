/*
  Warnings:

  - Made the column `temp` on table `history` required. This step will fail if there are existing NULL values in that column.
  - Made the column `humd` on table `history` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uv` on table `history` required. This step will fail if there are existing NULL values in that column.
  - Made the column `food` on table `history` required. This step will fail if there are existing NULL values in that column.
  - Made the column `drink` on table `history` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_deviceId_fkey`;

-- AlterTable
ALTER TABLE `history` MODIFY `temp` VARCHAR(191) NOT NULL,
    MODIFY `humd` VARCHAR(191) NOT NULL,
    MODIFY `uv` BOOLEAN NOT NULL,
    MODIFY `food` BOOLEAN NOT NULL,
    MODIFY `drink` BOOLEAN NOT NULL,
    MODIFY `deviceId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `Device`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
