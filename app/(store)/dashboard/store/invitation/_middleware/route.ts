import { type NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "./rateLimit";
import { ERROR_MESSAGES } from "@/types/invitation";

/**
 * 招待コード関連のルートに対するミドルウェア
 * @description レート制限とバリデーションを行う
 */
export async function middleware(request: NextRequest) {
  // POSTリクエストのみチェック
  if (request.method !== "POST") {
    return NextResponse.next();
  }

  // レート制限のチェック
  const isAllowed = await checkRateLimit(request);
  if (!isAllowed) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: {
          type: "RATE_LIMIT_EXCEEDED",
          message: ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
        },
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/invitation/:path*",
};
