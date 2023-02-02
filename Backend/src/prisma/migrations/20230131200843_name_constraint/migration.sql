/*
  Warnings:

  - Made the column `firstname` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `Delivery_userId_fkey`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_userId_fkey`;

-- DropForeignKey
ALTER TABLE `gift` DROP FOREIGN KEY `Gift_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `gift` DROP FOREIGN KEY `Gift_giftItemId_fkey`;

-- DropForeignKey
ALTER TABLE `gift` DROP FOREIGN KEY `Gift_userId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `firstname` VARCHAR(255) NOT NULL,
    MODIFY `lastname` VARCHAR(255) NOT NULL;
