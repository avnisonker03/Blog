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
            // console.log("Login action payload:", action.payload);
            state.status = true;
            state.userData = action.payload; // Ensure the payload contains `userData`
            console.log("Login action payload userData:", state.userData);
        },
        logout: (state) => {
            console.log("Logout action dispatched");
            state.status = false;
            state.userData = null; // Reset `userData` to null
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
