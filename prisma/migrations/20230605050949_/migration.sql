/*
  Warnings:

  - You are about to alter the column `isAuto` on the `device` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `device` MODIFY `isAuto` VARCHAR(191) NULL;
