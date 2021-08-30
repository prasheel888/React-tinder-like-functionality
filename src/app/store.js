import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    user: useReducer,
  },
});
