import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useStateValue } from "./provider/StateProvider";
import Payment from "./components/payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51KRg8OBsDwIUVUIFwCegm8JDu0PN9whAt9ubq7H5k1lFWyeH0abf7kM4285TOdhZxuvbV9QUxTgtRsoYEQbSkmUe00sH1fkEAo"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={[<Header />, <Home />]} />
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/payment"
            element={
              <React.Fragment>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </React.Fragment>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
