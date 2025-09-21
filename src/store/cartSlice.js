import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // Each Action is mapped to : Reducer function
    addItem: (state, action) => {
      // Mutating the state
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      // either mutate the state of return new state
      // state.items.length = 0;
      return { items: [] };
    },
  },
});

// export Actions - used for dispatching actions; these functions update the cart state
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// export Reducer - used for creating the Redux store and handling state updates
export default cartSlice.reducer;
