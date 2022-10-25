import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    users: [],
    accessToken: "",
  },
  reducers: {
    saveUser(state, action) {
      //console.log("Action payload", action.payload.user);
      //console.log("Action payload token", action.payload.accessToken);
      state.users = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    insertUser() {},
    signInUser() {},
  },
});

export default userSlice;