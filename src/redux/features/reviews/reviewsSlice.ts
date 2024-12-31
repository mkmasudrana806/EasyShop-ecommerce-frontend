import { createSlice } from "@reduxjs/toolkit";

interface ReviewState {
  editReviewData: {
    _id: string;
    postId: string;
    review: string;
  } | null;
}

const initialState: ReviewState = {
  editReviewData: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    // set edit review data to state
    setEditReviewData: (state, action) => {
      state.editReviewData = action.payload;
    },

    // clear edit review data from state
    clearEditReviewData: (state) => {
      state.editReviewData = null;
    },
  },
});

export const { setEditReviewData, clearEditReviewData } = reviewSlice.actions;
export default reviewSlice.reducer;
