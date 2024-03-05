import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      const { id, email } = action.payload;
      const existingUserById = state.find((user) => user.id === id);
      const existingUserByEmail = state.find((user) => user.email === email);
      
      // if(!existingUserById && !existingUserByEmail){
      //     state.push(action.payload)
      // }

      !existingUserById && !existingUserByEmail && state.push(action.payload);
    },
    editUser: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
        return state.filter(item=>item.id != action.payload)
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
