import React, { useContext, useState, useEffect } from "react";
import styles from "./payment.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { ClipLoader } from "react-spinners";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { paymentAxiosInstance } from "../../utils/axios";
import { db } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { type } from "../../utils/action.type";

const Payment = () => {
  const navigate = useNavigate();
  const [cardError, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cardValid, setCardValid] = useState(false); // Track card validity
  const stripe = useStripe();
  const elements = useElements();
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const totalItem = basket.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce((acc, curr) => acc + curr.price * curr.amount, 0);

  // Ensure user has items in the basket and user data is available
  useEffect(() => {
    if (basket.length === 0) {
      setError("Your cart is empty.");
    } else if (!user?.email) {
      setError("Please log in to continue with the payment.");
    } else {
      setLoading(false);
    }
  }, [basket, user]);

  const handleChange = (e) => {
    setError(e.error ? e.error.message : "");
    setCardValid(e.complete); // Update validity based on card input
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const response = await paymentAxiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data.client_secret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      const orderRef = doc(db, "users", user.uid, "orders", paymentIntent.id);
      await setDoc(orderRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      dispatch({
        type: type.EMPTY_BASKET,
      });

      setProcessing(false);
      navigate("/orders", {
        state: { msg: "You have placed a new order." },
      });
    } catch (error) {
      console.error("Error processing payment: ", error);
      setError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={styles.payment_header}>
        Checkout ({totalItem}) items
      </div>
      <section className={styles.payment}>
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={styles.flex}>
          <h1>Review items and delivery</h1>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} flex={true} product={item} />
            ))}
          </div>
        </div>
        <hr />
        <div className={styles.flex}>
          <h3>Payment methods</h3>
          <div className={styles.payment_card_container}>
            <div className={styles.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {loading ? (
                  <div className={styles.loading}>
                    <ClipLoader color="gray" size={12} />
                    <p>Loading payment form...</p>
                  </div>
                ) : (
                  <>
                    <CardElement onChange={handleChange} />
                    <div className={styles.payment_price}>
                      <div>
                        <span style={{ display: "flex", gap: "10px" }}>
                          <p>Total Order |</p> {total}
                        </span>
                      </div>
                      <button type="submit" disabled={processing || !cardValid}>
                        {processing ? (
                          <div className={styles.loading}>
                            <ClipLoader color="gray" size={12} />
                            <p>Please Wait...</p>
                          </div>
                        ) : (
                          "Pay Now"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
