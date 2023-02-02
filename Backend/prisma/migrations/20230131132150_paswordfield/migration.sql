-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `gender` VARCHAR(255) NULL,
    `placeOfResidence` VARCHAR(255) NULL,
    `tel` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `dob` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `category` VARCHAR(255) NOT NULL,
    `venue` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `timezone` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `descCeleb` VARCHAR(255) NULL,
    `summary` VARCHAR(255) NULL,
    `descSummary` VARCHAR(255) NULL,
    `published` BOOLEAN NOT NULL,
    `applyDonation` BOOLEAN NOT NULL,
    `percentDonation` INTEGER NOT NULL,
    `userId` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GiftItem` (
    `id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `category` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `details` VARCHAR(255) NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gift` (
    `id` VARCHAR(255) NOT NULL,
    `giftItemId` VARCHAR(255) NOT NULL,
    `enableContribution` BOOLEAN NOT NULL,
    `purchased` BOOLEAN NOT NULL,
    `quantity` INTEGER NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `complimentaryGift` VARCHAR(255) NOT NULL,
    `amountPaid` INTEGER NOT NULL,
    `eventId` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Delivery` (
    `id` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `expectedDate` DATETIME(3) NOT NULL,
    `postalCode` VARCHAR(255) NOT NULL,
    `tel` VARCHAR(255) NOT NULL,
    `tel2` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gift` ADD CONSTRAINT `Gift_giftItemId_fkey` FOREIGN KEY (`giftItemId`) REFERENCES `GiftItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gift` ADD CONSTRAINT `Gift_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gift` ADD CONSTRAINT `Gift_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
