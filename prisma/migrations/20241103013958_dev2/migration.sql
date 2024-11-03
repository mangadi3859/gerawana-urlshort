-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_shortLinkId_fkey`;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_shortLinkId_fkey` FOREIGN KEY (`shortLinkId`) REFERENCES `ShortLink`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
