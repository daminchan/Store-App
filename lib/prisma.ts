import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prismaクライアントのシングルトンインスタンス
 * @description 開発環境でのホットリロード時に複数のインスタンスが作成されるのを防ぐ
 */
export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
