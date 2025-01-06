import React, { useContext } from "react";
import styles from "./cart.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { Link } from "react-router-dom";
import { type } from "../../utils/action.type";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Cart = () => {
  const [{ basket }, dispatch] = useContext(DataContext);

  const increment = (item) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (item) => {
    dispatch({
      type: type.REMOVE_FROM_BASKET,
      id: item.id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: type.CLEAR_BASKET,
    });
  };

  // Format subtotal to two decimal places
  const total = basket.reduce((acc, curr) => acc + curr.price * curr.amount, 0).toFixed(2);

  return (
    <LayOut>
      <div className={styles.container}>
        <div className={styles.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Your cart is empty. Start shopping!</p>
          ) : (
            basket.map((item) => (
              <section key={item.id} className={styles.cart_product}>
                <ProductCard
                  product={item}
                  renderAdd={true}
                  flex={true}
                  renderDesc={true}
                />
                <div className={styles.btn_container}>
                  <button
                    className={styles.btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={styles.btn}
                    onClick={() => decrement(item)}
                  >
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
          {basket.length > 0 && (
            <button className={styles.clearCart} onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>
        {basket.length > 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>Subtotal ({basket.length}) items</p>
              <p>Total: ${total}</p>
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to Checkout</Link>
          </div>
        )}
      </div>
    </LayOut>
  );
};

export default Cart;
