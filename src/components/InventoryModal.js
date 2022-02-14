import React, { useState,useEffect } from "react";
import Modal from "./UI/Modal";
import { randomNumber } from "./utility/randomNumber";
import { medicineActions } from "../store/medicineSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const InventoryModal = ({ onToggle, medicine }) => {

  const dispatch = useDispatch();

  const [medName, setMedName] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");


  useEffect(()=>{
    if(medicine){
      setMedName(medicine.name);
      setManufacture(medicine.manufacture);
      setPrice(medicine.price);
      setStock(medicine.stock);
      setDiscount(medicine.discount)
    }

    
  },[]);

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      id: randomNumber(10000),
      name: medName,
      manufacture,
      price: parseInt(price),
      stock: parseInt(stock),
      discount: parseInt(discount),
    };


    if(medName.trim().length==0 || manufacture.trim().length==0 || !price || !stock || !discount)
    {
      return toast.warning("Fields can't be empty");
    }

    if(medicine)
    {
      data ={...data,id : medicine.id}

      dispatch(medicineActions.updateMedicine(data));
      onToggle();
       toast.info("Medicine Updated Successfully!");
   }
  else{
   
    dispatch(medicineActions.addMedicine(data));
    onToggle();
    toast.success("Medicine Added Successfully!");
  }
    
  };

  return (
    <Modal>
      <div className="close" onClick={onToggle}>
        &times;
      </div>

      <h1>Add Medicine Details</h1>

      <div className="form-container">
        <form className="modal-form" onSubmit={submitHandler}>
          <div className="input-wrapper">
            <label htmlFor="medName">Medicine Name</label>
            <input
              type="text"
              placeholder="Medicine Name"
              id="medName"
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              placeholder="Manuafacturer"
              id="manufacturer"
              value={manufacture}
              onChange={(e) => setManufacture(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              min="0"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              placeholder="Stock"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="discount">Discount</label>
            <input
              type="number"
              id="discount"
              placeholder="discount"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
      {medicine ?  
     
          <button className="btn" style={{ margin: "2rem auto 0 auto" }}>
            Update Medicine
          </button>:

          <button className="btn" style={{ margin: "2rem auto 0 auto" }}>
          Add to Inventory
        </button>
          }
          
         
        </form>
      </div>
    </Modal>
  );
};

export default InventoryModal;
