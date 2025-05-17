import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from '../Features/DataSlice'
export const store =  configureStore({
    reducer : {
        movieData : MovieReducer 
    }
})
export default store ;