import { configureStore } from "@reduxjs/toolkit";
import newsDataReducer from "./slice/newsDataslice";


const store=configureStore({
    reducer:{
    data:newsDataReducer
    }
})

export default store