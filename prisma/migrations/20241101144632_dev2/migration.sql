/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `ShortLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ShortLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shortlink` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ShortLink_link_key` ON `ShortLink`(`link`);
