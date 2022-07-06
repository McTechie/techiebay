import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartFromStorage: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      
      let newCart = [...state.items];

      if (index >= 0) {
        newCart[index].count += 1;
      } else {
        newCart.push(action.payload);
      }

      // localStorage.setItem('techiebay cart', JSON.stringify([...newCart]));

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

      // localStorage.setItem('techiebay cart', JSON.stringify([...newCart]));

      state.items = newCart;
    },
    removeAllFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);

      let newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      }

      // localStorage.setItem('techiebay cart', JSON.stringify([...newCart]));

      state.items = newCart;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  fetchCartFromStorage
} = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + (item.price * item.count), 0);
export const selectPrime = (state) => {
  const itemsHavePrimeDelivery = state.cart.items.map(item => item.hasPrimeDelivery);
  const primeDeliveryEligible = itemsHavePrimeDelivery.every(Boolean);
  return primeDeliveryEligible;
}

export default cartSlice.reducer;