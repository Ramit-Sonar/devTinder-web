
import { createSlice } from "@reduxjs/toolkit";

// Create a slice to manage user-related state
const userSlice = createSlice({
    // Name of this slice
    name: "user",

    // Initial state: no user is logged in
    initialState: null,

    // Functions that describe how state changes
    reducers: {
        // Store the logged-in user's data
        addUser: (state, action) => {
            return action.payload;
        },

        // Remove the logged-in user's data
        removeUser: (state, action) => {
            return null;
        }
    }
});

// Export the automatically generated action creators
export const { addUser, removeUser } = userSlice.actions;

// Export the reducer to register in the Redux store
export default userSlice.reducer;
