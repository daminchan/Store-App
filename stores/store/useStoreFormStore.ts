import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { BusinessHour, StoreFormState } from "@/types/store";

interface StoreFormStore extends StoreFormState {
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setCategories: (categories: string[]) => void;
  setBusinessHours: (businessHours: BusinessHour[]) => void;
  setError: (field: keyof StoreFormState, message: string) => void;
  clearErrors: () => void;
  reset: () => void;
}

const initialState: StoreFormState = {
  name: "",
  description: "",
  categories: [],
  businessHours: [],
  errors: {},
};

export const useStoreFormStore = create<StoreFormStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setName: (name) => set({ name }),
      setDescription: (description) => set({ description }),
      setCategories: (categories) => set({ categories }),
      setBusinessHours: (businessHours) => set({ businessHours }),
      setError: (field, message) =>
        set((state) => ({
          errors: { ...state.errors, [field]: message },
        })),
      clearErrors: () => set({ errors: {} }),
      reset: () => set(initialState),
    }),
    { name: "store-form" }
  )
);
