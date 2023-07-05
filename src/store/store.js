import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
// import { authSlice } from "./auth/authSlice";
// import { uiSlice } from "./ui/uiSlice";
// import { uiSlice } from "./";

export  const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }) 

})