import { RateLimiter } from "limiter";
import { type NextRequest } from "next/server";
import { RATE_LIMIT } from "@/types/invitation";

/**
 * レート制限の管理
 * @description IPアドレスごとに招待コードの検証回数を制限
 */
const limiters = new Map<string, RateLimiter>();

/**
 * レート制限のインスタンスを取得
 * @param ip - IPアドレス
 */
function getLimiter(ip: string): RateLimiter {
  if (!limiters.has(ip)) {
    // 5分間に5回までの試行を許可
    const limiter = new RateLimiter({
      tokensPerInterval: RATE_LIMIT.MAX_ATTEMPTS,
      interval: RATE_LIMIT.WINDOW_MINUTES * 60 * 1000, // ミリ秒に変換
      fireImmediately: true,
    });
    limiters.set(ip, limiter);
    return limiter;
  }
  return limiters.get(ip)!;
}

/**
 * レート制限をチェック
 * @param request - リクエスト情報
 * @returns 制限内であればtrue
 */
export async function checkRateLimit(request: NextRequest): Promise<boolean> {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] ?? "127.0.0.1";
    const limiter = getLimiter(ip);

    // トークンを消費できればtrue、できなければfalse
    return await limiter.tryRemoveTokens(1);
  } catch (error) {
    console.error("レート制限のチェックに失敗しました:", error);
    // エラーの場合は安全のためtrueを返す
    return true;
  }
}

/**
 * 残り試行回数を取得
 * @param request - リクエスト情報
 * @returns 残りの試行可能回数
 */
export async function getRemainingAttempts(
  request: NextRequest
): Promise<number> {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] ?? "127.0.0.1";
    const limiter = getLimiter(ip);

    return Math.floor(limiter.getTokensRemaining());
  } catch (error) {
    console.error("残り試行回数の取得に失敗しました:", error);
    return 0;
  }
}
