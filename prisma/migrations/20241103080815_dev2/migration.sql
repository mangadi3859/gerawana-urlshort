/*
  Warnings:

  - A unique constraint covering the columns `[otp]` on the table `ResetPassword` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `otp` to the `ResetPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resetpassword` ADD COLUMN `otp` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ResetPassword_otp_key` ON `ResetPassword`(`otp`);
