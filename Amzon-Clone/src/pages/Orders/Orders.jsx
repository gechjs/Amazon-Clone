import React, { useEffect, useContext, useState } from "react";
import styles from "./orders.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../utils/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const ordersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setOrders(ordersData);
          setLoading(false);
        },
        (err) => {
          setError("Failed to fetch orders. Please try again later.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.orders_container}>
          <h2>Your Orders</h2>
          <div>
            {loading ? (
              <div className={styles.loading_message}>Loading your orders...</div>
            ) : error ? (
              <div className={styles.error_message}>{error}</div>
            ) : orders?.length === 0 ? (
              <div className={styles.no_orders_message}>
                You don't have any orders yet. Start shopping to place your first order!
              </div>
            ) : (
              orders.map((eachOrder) => (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  {eachOrder.data.basket.map((order, index) => (
                    <div key={index} className={styles.product_wrapper}>
                      <ProductCard flex={true} product={order} />
                      {order.quantity && (
                        <p className={styles.quantity}>
                          Quantity: {order.quantity}
                        </p>
                      )}
                    </div>
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
