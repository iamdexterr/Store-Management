import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Medicine 1",
    manufacture: "A to Z brand",
    price: 2000,
    stock: 50,
    discount: 10,
  },
  {
    id: 2,
    name: "Medicine 2",
    manufacture: "X brand",
    price: 1000,
    stock: 20,
    discount: 5,
  },
  {
    id: 3,
    name: "Medicine 3",
    manufacture: "Brand C",
    price: 100,
    stock: 60,
    discount: 15,
  },
];

const medicineSlice = createSlice({
  name: "medicines",
  initialState: initialState,
  reducers: {

      addMedicine(state,action){
        const addedMed = state;
        addedMed.push(action.payload)
        localStorage.setItem('medicines',JSON.stringify(addedMed));
        return addedMed;
      },

      deleteMedicine(state,action){
        const newMeds = state.filter(med => med.id !== action.payload);
        localStorage.setItem('medicines',JSON.stringify(newMeds));

        return newMeds;
        
      },
      updateMedicine(state,action){
     
        const updatedMed =state.map(med => med.id===action.payload.id? action.payload : med);
        localStorage.setItem('medicines',JSON.stringify(updatedMed));
        return updatedMed;
      },
      setLocalMeds(state,action){
        const localMeds = action.payload;
        return localMeds;
      }

  },
});

export const medicineActions = medicineSlice.actions;

export default medicineSlice.reducer;
