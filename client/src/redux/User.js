import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {},
        pending: false,
        error: false
    },
    reducers: {
        startAPI: (state) => {
            state.pending = true;
        },
        loginSuccess: (state, action) => {
            state.pending = false;
            if (typeof window !== 'undefined') {
                localStorage.setItem('profile', JSON.stringify({ ...action?.payload}))
            };
            state.userInfo = action?.payload.result;
        },
        logoutSuccess: (state) => {
            state.pending = false;
            state.userInfo = null;
            if (typeof window !== 'undefined') {
                localStorage.clear();
            }
        },
        errorAPI: (state) => {
            state.pending = null;
            state.error = true;
        }
    }
});

export const googleLogin = (userInfo, dispatch) => {
    dispatch(userSlice.actions.startAPI());

    try {
        dispatch(userSlice.actions.loginSuccess(userInfo));
    } catch (error) {
        dispatch(userSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}
export const login = async (userInfo, navigate, dispatch) => {
    dispatch(userSlice.actions.startAPI());

    try {
        
        const res = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        });

        const data = await res.json();
        
        dispatch(userSlice.actions.loginSuccess(data));

        navigate("/");
    } catch (error) {
        dispatch(userSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}
export const signup = async (userInfo, navigate, dispatch) => {
    dispatch(userSlice.actions.startAPI());

    try {
        
        const res = await fetch(`${BASE_URL}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        });

        const data = await res.json();

        if(data?.message === "Account already exists."){
            return data;
        }

        dispatch(userSlice.actions.loginSuccess(data));
        navigate("/");
    } catch (error) {
        dispatch(userSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}
export const logout = (navigate, dispatch) => {
    dispatch(userSlice.actions.startAPI());

    try {
        dispatch(userSlice.actions.logoutSuccess());

        navigate("/");
    } catch (error) {
        dispatch(userSlice.actions.errorAPI());
        console.log("error: ", error);
    }
}

export default userSlice.reducer;