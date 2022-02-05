import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={[<Home />]} />
          <Route path="/checkout" element={[<Checkout />]} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
