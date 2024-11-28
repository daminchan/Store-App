/*
  Warnings:

  - The `categories` column on the `Store` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `category` on the `MenuItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StoreCategory" AS ENUM ('JAPANESE', 'CHINESE', 'WESTERN', 'ITALIAN', 'FRENCH', 'KOREAN', 'CAFE', 'OTHER');

-- CreateEnum
CREATE TYPE "MenuCategory" AS ENUM ('MAIN', 'SIDE', 'DRINK', 'DESSERT', 'OTHER');

-- AlterTable
ALTER TABLE "BusinessHour" ADD COLUMN     "isHoliday" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "category",
ADD COLUMN     "category" "MenuCategory" NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "categories",
ADD COLUMN     "categories" "StoreCategory"[];
