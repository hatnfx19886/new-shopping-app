import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialCart = JSON.parse(localStorage.getItem('cart')) || {
  item: [],
  cartTotal: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addItem(state, action) {
      // action.payload is a object
      state.item.push(action.payload);
      state.cartTotal += action.payload.total;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem(state, action) {
      // action.payload is index
      const index = action.payload;
      state.cartTotal -= state.item[index].total;
      state.item.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    increment(state, action) {
      // action.payload is index
      const index = action.payload;
      state.item[index].quantity++;
      state.item[index].total += state.item[index].price;
      state.cartTotal += state.item[index].price;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decrement(state, action) {
      // action.payload is index
      const index = action.payload;
      if (state.item[index].quantity > 1) {
        state.item[index].quantity--;
        state.item[index].total -= state.item[index].price;
        state.cartTotal -= state.item[index].price;
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    clear(state) {
      state.item = [];
      state.cartTotal = 0
      localStorage.removeItem('cart')
    }
  },
});

const store = configureStore({
  reducer: cartSlice.reducer,
});

export const cartActions = cartSlice.actions;

export default store;
