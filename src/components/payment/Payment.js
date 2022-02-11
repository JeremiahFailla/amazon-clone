import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./../../provider/StateProvider";
import CheckoutProduct from "./../checkout/CheckoutProject";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./../../reducer/reducer";
import axios from "./../../axios/axios";
import { db } from "./../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProccessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // generate stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: "post",
          // stripe expects the total in a currencies subunits
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error.message);
      }
    };
    getClientSecret();
  }, [basket]);

  console.log("The secret is", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProccessing(true);
    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(payload);

      const userRef = doc(
        db,
        "users",
        user?.uid,
        "orders",
        payload.paymentIntent.id
      );
      await setDoc(userRef, {
        basket: basket,
        amount: payload.paymentIntent.amount,
        created: payload.paymentIntent.created,
      });

      setSucceeded(true);
      setError(null);
      setProccessing(false);

      dispatch({ type: "EMPTY_BASKET" });

      navigate("/orders", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
      </div>
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                key={Math.random() * 1000}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <React.Fragment>
                      <h3>Order Total: {value}</h3>
                    </React.Fragment>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
