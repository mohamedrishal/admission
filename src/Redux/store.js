import {configureStore} from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice';


const store = configureStore({
    reducer : {
       userReducer : userSlice
    }
})

export default store;