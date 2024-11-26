import { type FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const RootPage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-bold">Welcome to My App</h1>
      <Button asChild>
        <Link href="/dashboard">ダッシュボードへ移動</Link>
      </Button>
    </div>
  );
};

export { RootPage as default };
