"use client";
import { type FC } from "react";
import { StoreForm } from "./_components/StoreForm";

export const NewStorePage: FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">店舗登録</h1>
      <StoreForm />
    </div>
  );
};
