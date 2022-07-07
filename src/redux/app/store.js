import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../slices/cartSlice'
import previewReducer from '../slices/previewSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    preview: previewReducer,
  },
});