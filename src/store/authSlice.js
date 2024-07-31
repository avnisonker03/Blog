import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null, // Initialize as null to match the login reducer
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData; // Ensure the payload contains `userData`
        },
        logout: (state) => {
            state.status = false;
            state.userData = null; // Reset `userData` to null
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
