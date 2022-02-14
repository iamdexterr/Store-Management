import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // {
  //   cart: {
  //     totalPrice: 6500,
  //     cartItems: [
  //       { id: 1, name: "Medicine 1", price: 2000, qty: 2 },
  //       { id: 2, name: "Medicine 2", price: 1000, qty: 2 },
  //       { id: 3, name: "Medicine 3", price: 100, qty: 5 },
  //     ],
  //   },
  //   customerContact: "7557675715",
  //   customerName: "Dinesh Rawat",
  //   orderId: 777537,
  //   userId: 1,
  // },
  // {
  //   cart: {
  //     totalPrice: 6000,
  //     cartItems: [
  //       { id: 1, name: "Medicine 1", price: 2000, qty: 2 },
  //       { id: 2, name: "Medicine 2", price: 1000, qty: 2 },

  //     ],
  //   },
  //   customerContact: "435345345",
  //   customerName: "Aman singh",
  //   orderId: 737537,
  //   userId: 3,
  // }
  
];

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
      addOrder(state,action){
 
        const addedOrder = state;
         addedOrder.push(action.payload)
         localStorage.setItem('orders',JSON.stringify(addedOrder));
         return addedOrder;

      },
      deleteOrder(state,action){
        const newOrders = state.filter(order => order.orderId !== action.payload);
        console.log(newOrders);
        localStorage.setItem('orders',JSON.stringify(newOrders));

        return newOrders;
       },
       setLocalOrders(state,action){
        const localOrders = action.payload;
        return localOrders;
      }
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
