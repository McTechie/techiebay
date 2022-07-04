import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      
      let newCart = [...state.items];

      if (index >= 0) {
        newCart[index].count += 1;
      } else {
        newCart.push(action.payload);
      }

      state.items = newCart;
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);

      let newCart = [...state.items];

      if (index >= 0) {
        if (newCart[index].count > 1) {
          newCart[index].count -= 1;
        } else {
          newCart.splice(index, 1);
        }
      }

      state.items = newCart;
    },
    removeAllFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);

      let newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      }

      state.items = newCart;
    }
  },
});

export const { addToCart, removeFromCart, removeAllFromCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;