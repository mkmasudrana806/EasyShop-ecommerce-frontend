import { TProduct } from "@/types/productType";
import { createSlice } from "@reduxjs/toolkit";

// type
export type TProducts = {
  items: TProduct[];
  editProductData: TProduct | null;
  showProductData: TProduct | null;
  compareList: TProduct[];
};

// initialState
const initialState: TProducts = {
  items: [],
  editProductData: null,
  showProductData: null,
  compareList: [],
};

// Products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // --------- set all products to store
    loadAllProducts: (state, action) => {
      state.items = action.payload;
    },

    // ------------ delete a product
    deleteProductFromStore: (state, action) => {
      state.items = state.items.filter(
        (product) => product._id !== action.payload
      );
    },

    // update product into store
    updateSingleProduct: (state, action) => {
      state.items = state?.items?.map((product) => {
        if (product._id === action?.payload?.productId) {
          return { ...product, ...action?.payload?.product };
        } else {
          return product;
        }
      });
    },

    // edit a product
    setEditProductData: (state, action) => {
      state.editProductData = action.payload;
    },
    // clear edit Product
    clearEditProductData: (state) => {
      state.editProductData = null;
    },

    // show a Product data
    setShowProductData: (state, action) => {
      state.showProductData = action.payload;
    },
    // clear show Product
    clearShowProductData: (state) => {
      state.showProductData = null;
    },
    // toggle compare lists
    toggleCompare: (state, action) => {
      const product = action.payload;
      // Check if the product is already in the compare list
      const isProductInCompare = state.compareList.some(
        (item) => item._id === product._id
      );

      if (isProductInCompare) {
        // If product is in the compare list, remove it
        state.compareList = state.compareList.filter(
          (item) => item._id !== product._id
        );
      } else if (state.compareList.length < 3) {
        state.compareList.push(product);
      }
    },
    // clear compare lists
    clearCompareList: (state) => {
      state.compareList = [];
    },
  },
});

export const {
  loadAllProducts,
  deleteProductFromStore,
  updateSingleProduct,
  setEditProductData,
  clearEditProductData,
  setShowProductData,
  clearShowProductData,
  toggleCompare,
  clearCompareList,
} = productsSlice.actions;

export default productsSlice.reducer;
