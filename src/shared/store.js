import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../components/Auth/AuthSlice";

const store = configureStore({
    reducer: {
        authorization: authReducers,
    },
});

export default store;
