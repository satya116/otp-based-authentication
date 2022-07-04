
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    otp: {
        phone: "",
        hash: ""
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state: any, action) => {
            const {user, auth} = action.payload
            state.isAuth = auth;
            state.user = user;
            //state.user = {username: "satya116"}
            //4.36 minutes video 4
        },
        setOTP: (state, action) => {
            state.otp.phone = action.payload.phone;
            state.otp.hash = action.payload.hash
        }
    },
})

export const { setAuth, setOTP } = authSlice.actions;

export default authSlice.reducer;