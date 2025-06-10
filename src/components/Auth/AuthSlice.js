import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: "user",
    permissions: [],
};

const AuthSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        ToggleAuthorization: (state, action) => {
            return {
                ...initialState,
                role: action.payload.role,
                permissions: action.payload.permissions,
            };
        },
    },
});

export const { ToggleAuthorization } = AuthSlice.actions;

export default AuthSlice.reducer;
