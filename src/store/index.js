import { configureStore,createSlice } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import medicineReducer from "./medicineSlice";
import orderReducer from "./orderSlice";

const initialState = null;


const currentUser = createSlice({
    name :'current user',
    initialState: initialState,
    reducers:{
        setCurrentUser(state,action){
            state= action.payload;
            return state
        },
        removeCurrentUser(state){

            state=null;
            return state
        }
    }

});

const store = configureStore({
  reducer: {
    users: userReducer,
    medicines: medicineReducer,
    orders: orderReducer,
    currentUser : currentUser.reducer
  },
});

export const currentUserActions = currentUser.actions;

export default store;
