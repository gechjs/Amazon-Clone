import React, { useEffect, useContext, useState } from "react";
import styles from "./orders.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../utils/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import {
  collection,
  doc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setOrders(ordersData);
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.orders_container}>
          <h2>Your Orders</h2>
          <div>
            {orders?.length === 0 ? (
              <div style={{
                padding: '20px',
              }}>you don't have orders yet.</div>
            ) : (
              orders.map((eachOrder) => (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  {eachOrder.data.basket.map((order, index) => (
                    <ProductCard flex={true} product={order} key={index} />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
