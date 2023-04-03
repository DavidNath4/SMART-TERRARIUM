/*
  Warnings:

  - You are about to drop the column `email` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `profile` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Profile_email_key` ON `profile`;

-- DropIndex
DROP INDEX `Profile_username_key` ON `profile`;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `email`,
    DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
