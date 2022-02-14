import React, { useState } from "react";
import Inventory from "./Inventory";
import SalesExecutive from "./SalesExecutive";
import Navbar from "./Navbar";
import Orders from "./Orders";
import CreateOrder from "./CreateOrder";
import { useSelector } from 'react-redux'


const AdminPanel = () => {
  const currentUser = useSelector(state=> state.currentUser);

  const [activeSection, setActiveSection] = useState(currentUser.role=='admin' ?"inventory":'createOrder');

  const sectionChangeHandler = (event, sectionName) => {
    setActiveSection(sectionName);
    const liElements = document.querySelectorAll(".navbar ul li");
    liElements.forEach((li) => {
      li.classList.remove("active");
    });
    event.target.classList.add("active");
  };

  return (
    <>
      <Navbar onSectionChange={sectionChangeHandler} />

      {activeSection === "inventory" && <Inventory />}
      {activeSection === "sales" && <SalesExecutive />}
      {activeSection === "createOrder" && <CreateOrder />}
      {activeSection === "orders" && <Orders />}
    </>
  );
};

export default AdminPanel;
