import type { BusinessHour } from "./businessHour";

export type StoreFormState = {
  name: string;
  description: string;
  categories: string[];
  businessHours: BusinessHour[];
  errors: Record<string, string>;
};

export type StoreFormErrors = {
  [K in keyof Omit<StoreFormState, "errors">]?: string;
};
