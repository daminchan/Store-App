// src/app/(auth)/role-select/_components/RoleCard/RoleCard.tsx

import { type RoleCardProps } from "../../_types";

/**
 * 役割選択カードコンポーネント
 * 選択可能な役割を表示するカードUIを提供
 */
export const RoleCard = ({
  title,
  description,
  onSelect,
  isDisabled,
}: RoleCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      className="w-full p-6 border rounded-lg text-left transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      role="radio"
      aria-checked="false"
    >
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </button>
  );
};
