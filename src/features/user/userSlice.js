import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setSignOutState: (state) => {
      state.name = null;
      state.phoneNumber = null;
    },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserNumber = (state) => state.user.phoneNumber;

export default userSlice.reducer;
