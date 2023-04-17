import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { configureStore } from "@reduxjs/toolkit";

import Images from "./Images.js";
import User from "./User.js";

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })

export default configureStore({
    reducer: {
        images: Images,
        user: User
    },
    middleware: (getDefaultMiddleware) => customizedMiddleware
});