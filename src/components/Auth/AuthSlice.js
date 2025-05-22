import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: "user",
};

const AuthSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        ToggleAuthorization: (state, action) => {
            return {
                ...initialState,
                role: action.payload,
            };
        },
    },
});

export const { ToggleAuthorization } = AuthSlice.actions;

export default AuthSlice.reducer;
