import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { orderActions } from '../store/orderSlice';


const OrderList = () => {

    let orders = useSelector(state=>state.orders);
    const currentUser = useSelector(state=> state.currentUser);
    const dispatch =useDispatch();


    if(currentUser.role=='sales'){
        orders = orders.filter(order=> order.userId == currentUser.id)
    }

    const orderDeleteHandler =(id)=>{
        dispatch(orderActions.deleteOrder(id))
        toast.info('Order Deleted Successfully')
    }

  return (
      <>
      {orders.map(order=>{
          return (  
            <div className='content' key={order.id}>
            <div className="user-info">
                <h3>Customer Name : <span>{order.customerName}</span></h3>
                <h3>Contact Number : <span>{order.customerContact}</span></h3>
                <h3>OrderId : <span>{order.orderId}</span></h3>
                <button className='btn2 danger' onClick={()=>orderDeleteHandler(order.orderId)}>Delete</button>
            </div>
        
            <table>
        <thead>
            <tr>
                <th>Medicine</th>
                <th>Qty</th>
                <th>Price</th>
                
            </tr>
        </thead>
        <tbody>
            {order.cart.cartItems.map(item=>{
                return (
                 <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.price}</td>
                </tr>
                )
            })}
     
        </tbody>
        
        <tfoot>
            <tr>
                <td>Total</td>
                <td></td>
                <td>{order.cart.totalPrice}</td>
            </tr>
        </tfoot>
        </table>
        </div>
          )
      })}



</>
  )
}

export default OrderList