// // src/stores/cart/cartStore.ts
// import { create } from 'zustand'
// import { type MenuItem } from '@/types'

// type CartItem = {
//   menuItem: MenuItem
//   quantity: number
// }

// type CartStore = {
//   items: CartItem[]
//   addItem: (item: MenuItem) => void
//   removeItem: (itemId: string) => void
//   updateQuantity: (itemId: string, quantity: number) => void
//   clearCart: () => void
//   total: number
// }

// export const useCartStore = create<CartStore>((set, get) => ({
//   // ... 実装
// }))
