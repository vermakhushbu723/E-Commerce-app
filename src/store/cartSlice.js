import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
