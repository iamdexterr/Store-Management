import React, { useState,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { orderActions } from "../store/orderSlice";
import { randomNumber } from "./utility/randomNumber";



const CreateOrder = () => {
  const [cart, setCart] = useState({totalPrice:0,cartItems:[]});

  const medicines = useSelector((state) => state.medicines);
  const currentUser = useSelector(state=>state.currentUser);
  const dispatch = useDispatch();

  const medNameInputRef=useRef();
  const medQuantityInputRef=useRef();
  const custNameInputRef=useRef();
  const contactInputRef=useRef();

  const medicineSubmitHandler=(e)=>{
    e.preventDefault();
    const medId = medNameInputRef.current.value;
    const quantity = medQuantityInputRef.current.value;

    if(!quantity || quantity==0)
    {
      return toast.warning('Please add quantity');
    }
    const existItem = cart.cartItems.find(item => item.id ==medId);


    if(existItem){

      const items = cart.cartItems;
      const updatedItems = items.map(item=> item.id===existItem.id?{...item,qty: item.qty +parseInt(quantity)} : item);
      const totalPrice= updatedItems.reduce((acc,current)=>{

        return acc+= (current.price * current.qty);
      
      },0);

      setCart({totalPrice:totalPrice,cartItems:updatedItems});

    }
    else{
      const medDetails =medicines.find(med => med.id === parseInt(medId))

      const data = {
        id:medDetails.id,
        name : medDetails.name,
        price : medDetails.price,
       qty : parseInt(quantity)
      }

      const totalPrice = cart.totalPrice +( data.price * data.qty);
  
      setCart({totalPrice:totalPrice,cartItems:[...cart.cartItems,data]});
    }
  
  }

  const orderSubmitHandler = (e)=>{
    e.preventDefault();

    const custName = custNameInputRef.current.value;
    const contact = contactInputRef.current.value;

    if(custName.trim().length==0||contact.trim().length==0|| cart.cartItems.length==0){
      return toast.warning("Please add Info or Medicine to List");
    }

    const data= {
      userId: currentUser.id,
      orderId : randomNumber(1000000),
      customerName :custName,
      customerContact : contact,
      cart: cart
    }

    
    custNameInputRef.current.value="";
    contactInputRef.current.value="";
    medQuantityInputRef.current.value=null;
    dispatch(orderActions.addOrder(data));
    toast.success("Order Created Successfully")
    setCart({totalPrice:0,cartItems:[]});
  }


  return (
    <section className="create-order">
      <h1>Create Order</h1>
      <div className="form-container">


        <form className="med-form" onSubmit={medicineSubmitHandler}>
          <div>
            <label htmlFor="medicine">Medicine</label>
            {/* <input list="medicines" placeholder="Medicine Name" id="medicine" ref={medNameInputRef}/> */}
            <select  id="medicine"  ref={medNameInputRef}> 

            {medicines.map((med) => {
                return <option key={med.id} value={med.id} >{med.name}</option>;
              })}
            </select>
           
          </div>
          <div>
            <label htmlFor="qty">Qty</label>
            <input
              type="number"
              min="0"
              placeholder="Medicine Quantity"
              id="qty"
              ref={medQuantityInputRef}
            />
          </div>
          <button className="btn2 primary">Add</button>
        </form>

        <form className="contact-form" onSubmit={orderSubmitHandler}>
          <div className="form-control">
            <div>
              <label htmlFor="custName">Customer Name</label>
              <input type="text" id="custName" placeholder="Customer Name" ref={custNameInputRef}/>
            </div>

            <div>
              <label htmlFor="custNumber">Customer Number</label>
              <input type="text" id="custNumber" placeholder="Contact Number" ref={contactInputRef}/>
            </div>
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
              {cart.cartItems.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td>{cart.totalPrice}</td>
              </tr>
            </tfoot>
          </table>

          <button className="btn">Create Order</button>
        </form>
      </div>
    </section>
  );
};

export default CreateOrder;
