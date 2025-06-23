import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedFilter: null,
  selectedSort: "1",
  limit: "10",
  page: 1,
  maxPage: 1,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    setSelectedSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    nextPage: (state) => {
      state.page++;
    },
    prevPage: (state) => {
      state.page--;
    },

    setMaxPage: (state, action) => {
      state.maxPage = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const {
  setSelectedFilter,
  setSelectedSort,
  setProducts,
  nextPage,
  prevPage,
  setMaxPage,
  setPage,
  setLimit,
} = productsSlice.actions;

export default productsSlice.reducer;
