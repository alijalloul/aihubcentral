import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

const imagesSlice = createSlice({
    name: "images",
    initialState: {
        imagesInfo: [],
        pending: {},
        error: false
    },
    reducers: {
        startAPI: (state, action) => {
            state.pending = {...state.pending, [action.payload]: true};
        },
        fetchSuccess: (state, action) => {
            state.pending = {...state.pending, fetchPosts: false};
            state.imagesInfo = action.payload;
        },
        errorAPI: (state, action) => {
            state.pending = {...state.pending, [action.payload]: null};
            state.error = true;
        },
    }
});

export const fetchImages = async (dispatch) => {
    dispatch(imagesSlice.actions.startAPI("fetchPosts"));

    try {    
        const res = await fetch(`${BASE_URL}/imageShowcase`);
        const data = await res.json();

        dispatch(imagesSlice.actions.fetchSuccess(data))
    } catch (error) {
        dispatch(imagesSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}

export default imagesSlice.reducer;