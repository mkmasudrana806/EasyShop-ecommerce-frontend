import { TCartItem } from "@/types/cartType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TCarts = {
  items: TCartItem[];
  vendor: string | null;
};

const initialState: TCarts = {
  items: [],
  vendor: null,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    // add to cart list
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        if (existingItem.quantity < existingItem.inventoryCount) {
          existingItem.quantity = action.payload.quantity;
        }
      } else {
        state.items.push(action.payload);
      }
    },

    // set vendor
    setVendor: (state, action) => {
      state.vendor = action.payload;
    },

    // update cart quantity by 1
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (cartItem) => cartItem._id === action.payload.id
      );
      if (item && action.payload.quantity <= item.inventoryCount) {
        item.quantity = action.payload.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.vendor = null;
    },

    // remove a cart
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (cartItem) => cartItem._id !== action.payload
      );
    },
  },
});

export const {
  addToCart,
  setVendor,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
