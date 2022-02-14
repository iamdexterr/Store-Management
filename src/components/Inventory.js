import React, { useEffect, useState } from "react";
import InventoryModal from './InventoryModal';
import { useSelector,useDispatch } from "react-redux";
import { medicineActions } from "../store/medicineSlice";
import { toast } from "react-toastify";

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentMed, setCurrentMed] = useState();

  const dispatch = useDispatch();
  const medicines = useSelector(state => state.medicines);


  const toggleModalHandler = () => {
    setShowModal((prevModal) => !prevModal);
    setCurrentMed(null);
  };

  const deleteMedicineHandler=(id)=>{
    dispatch(medicineActions.deleteMedicine(id));
    toast.info('Medicine Deleted Successfully')
  }

  return (
    <>
      {showModal && <InventoryModal onToggle={toggleModalHandler} medicine={currentMed}/>}


      <section className="inventory">
        <h1>Inventory</h1>
        <button className="btn" onClick={toggleModalHandler}>
          Add Medicine
        </button>
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Manufacture</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Discount(%)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              medicines.map(med => {
                return (
                  <tr key={med.id}>
                  <td>{med.name}</td>
                  <td>{med.manufacture}</td>
                  <td>{med.price}</td>
                  <td>{med.stock}</td>
                  <td>{med.discount}</td>
                  <td>
                    <button className="btn2 primary" onClick={()=>{toggleModalHandler(); setCurrentMed(med)}}>Edit</button>
                    <button className="btn2 danger" onClick={()=>deleteMedicineHandler(med.id)}>Delete</button>
                  </td>
                </tr>
                );
              })
            }

          </tbody>
        </table>
      </section>
    </>
  );
};

export default Inventory;
