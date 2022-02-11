import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "./../../firebase/firebase";
import { useStateValue } from "./../../provider/StateProvider";
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    const getData = async () => {
      try {
        const q = await query(
          collection(db, "users", user?.uid, "orders"),
          orderBy("created", "desc")
        );
        onSnapshot(q, (snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="orders">
      <h1>Your orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
