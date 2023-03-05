-- CreateTable
CREATE TABLE "delivery" (
    "id" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "expectedDate" TIMESTAMP(3) NOT NULL,
    "postalCode" VARCHAR(255) NOT NULL,
    "tel" VARCHAR(255) NOT NULL,
    "tel2" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "eventId" VARCHAR(255) NOT NULL,

    CONSTRAINT "delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255),
    "category" VARCHAR(255) NOT NULL,
    "venue" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "timezone" VARCHAR(255),
    "image" VARCHAR(255),
    "descCeleb" VARCHAR(255),
    "summary" VARCHAR(255),
    "descSummary" VARCHAR(255),
    "published" BOOLEAN NOT NULL,
    "applyDonation" BOOLEAN NOT NULL,
    "percentDonation" INTEGER NOT NULL,
    "coHostCode" VARCHAR(6) NOT NULL,
    "coHostLink" VARCHAR(100) NOT NULL,
    "eventLink" VARCHAR(100) NOT NULL,
    "guestCode" VARCHAR(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "host" VARCHAR(255) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gift" (
    "id" VARCHAR(255) NOT NULL,
    "giftItemId" VARCHAR(255) NOT NULL,
    "enableContribution" BOOLEAN NOT NULL,
    "purchased" BOOLEAN NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchasedBy" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "complimentaryGift" VARCHAR(255) NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "eventId" VARCHAR(255),

    CONSTRAINT "gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giftitem" (
    "id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255),
    "category" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "details" VARCHAR(255),
    "amount" INTEGER NOT NULL,

    CONSTRAINT "giftitem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(255),
    "placeOfResidence" VARCHAR(255),
    "tel" VARCHAR(255),
    "state" VARCHAR(255),
    "dob" VARCHAR(255),
    "emailVerified" BOOLEAN,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "eventId" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp" (
    "id" VARCHAR(50) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "user" VARCHAR(100) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Delivery_eventId_fkey" ON "delivery"("eventId");

-- CreateIndex
CREATE INDEX "Event_userId_fkey" ON "event"("host");

-- CreateIndex
CREATE INDEX "Gift_eventId_fkey" ON "gift"("eventId");

-- CreateIndex
CREATE INDEX "Gift_giftItemId_fkey" ON "gift"("giftItemId");

-- CreateIndex
CREATE INDEX "Gift_purchasedBy_fkey" ON "gift"("purchasedBy");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "gift" ADD CONSTRAINT "gift_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
