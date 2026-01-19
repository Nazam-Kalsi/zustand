import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserStateT {
  name: string;
  age: number;
  email: string;
  address: string;
}

const initialState: UserStateT = {
  name: "Nazam Kalsi",
  age: 23,
  email: "brownbread@gmail.com",
  address: "H no. 90",
};

export const counterSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    update: (state, action:PayloadAction<{key: keyof UserStateT, value: string | number}>) => {
      const { key, value } = action.payload; 
      (state as any)[key] = value;
    }
  },
});

export const { update } = counterSlice.actions;

export default counterSlice.reducer;
