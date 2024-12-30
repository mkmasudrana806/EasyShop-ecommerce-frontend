import { TProduct } from "@/types/productType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  searchTerm: string;
  sort: string;
  sortBy: string;
  limit: number;
  page: number;
  editProductData: TProduct | null;
}

const initialState: FilterState = {
  searchTerm: "",
  sort: "",
  sortBy: "",
  limit: 5,
  page: 1,
  editProductData: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    searchProducts: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = initialState.searchTerm;
      state.sort = initialState.sort;
      state.limit = initialState.limit;
      state.page = initialState.page;
    },
    // edit a user
    setEditProductData: (state, action) => {
      state.editProductData = action.payload;
    },
    // clear edit Product
    clearEditProductData: (state) => {
      state.editProductData = null;
    },
  },
});

export const {
  searchProducts,
  setSort,
  setSortBy,
  setLimit,
  setPage,
  resetFilters,
  setEditProductData,
  clearEditProductData,
} = filterSlice.actions;

export default filterSlice.reducer;
