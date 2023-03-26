import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils";

const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus } = productsSlice.actions;
export default productsSlice.reducer;

// thunk usage
export function fetchProducts() {
  return async function fetchProductsThunk(dispatch, getState) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      dispatch(setProducts(data));
      dispatch(setStatus(STATUS.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
