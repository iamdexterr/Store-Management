import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    username: "iamdinesh",
    password: "iamdinesh",
    fName :'dinesh',
    lName: 'rawat',
    dob: '2012-12-21',
    gender : 'm',
    experience: '',
    role: "admin",
  },
  {
    id: 2,
    username: "test-admin",
    password: "test-admin",
    fName :'test',
    lName: 'test',
    dob: '2002-02-21',
    gender : 'm',
    experience: 2,
    role: "admin",
  },

  {
    id: 3,
    username: "test-sales",
    password: "test-sales",
    fName :'test',
    lName: 'test',
    dob: '1998-12-02',
    gender : 'f',
    experience: 1,
    role: "sales",
  },


];

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {

    addUser(state,action) {
    
      const addedUser = state;
        addedUser.push(action.payload)
        localStorage.setItem('users',JSON.stringify(addedUser));
        return addedUser;
    },
    deleteUser(state,action){
        const newUsers = state.filter(user => user.id !== action.payload);
        localStorage.setItem('users',JSON.stringify(newUsers));
        return newUsers;
        
 },
    updateUser(state,action){
        const updatedUser =state.map(user => user.id===action.payload.id ? action.payload : user);
        localStorage.setItem('users',JSON.stringify(updatedUser));
        return updatedUser;
    },
    setLocalUsers(state,action){
      const localUsers = action.payload;
      return localUsers;
    }
  },
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
