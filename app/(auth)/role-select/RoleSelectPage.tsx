// src/app/(auth)/role-select/_components/RoleSelectPage/RoleSelectPage.tsx

import { RoleSelectForm } from "./_components";

/**
 * 役割選択ページのコンポーネント
 * レイアウトとフォームの配置を担当
 */
export const RoleSelectPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          アカウントの種類を選択
        </h1>
        <RoleSelectForm />
      </div>
    </main>
  );
};
