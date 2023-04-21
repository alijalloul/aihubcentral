import { configureStore } from "@reduxjs/toolkit";

import Images from "./Images.js";
import User from "./User.js";

export default configureStore({
    reducer: {
        images: Images,
        user: User
    }
});