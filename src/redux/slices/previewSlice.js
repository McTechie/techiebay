import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  product: {},
};

export const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.product = action.payload;
    }
  }
});

export const {
  setCurrentProduct
} = previewSlice.actions;

export const selectProduct = (state) => state.preview.product;

export default previewSlice.reducer;