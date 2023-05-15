import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chatsInfo: [],
        pending: false,
        error: false
    },
    reducers: {
        startAPI: (state) => {
            state.pending = true;
        },
        fetchSuccess: (state, action) => {
            state.pending = false;
            state.chatsInfo = action.payload;
        },
        errorAPI: (state) => {
            state.pending = null;
            state.error = true;
        },
    }
});

export const setChatsState = (chats, dispatch) => {
    dispatch(chatsSlice.actions.startAPI());

    try {    
        dispatch(chatsSlice.actions.fetchSuccess(chats))
    } catch (error) {
        dispatch(chatsSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}

export default chatsSlice.reducer;