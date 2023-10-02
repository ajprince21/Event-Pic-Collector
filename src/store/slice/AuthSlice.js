import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null
}

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload;
        },
        logoutUser(state) {
            state.userData = null;
        }
    }
})


export const { setUserData, logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;