import React from "react";
import OrderList from "./OrderList";

const Orders = () => {
  return (
    <section className="orders">
      <h1>Orders History</h1>
      <OrderList />
    </section>
  );
};

export default Orders;
