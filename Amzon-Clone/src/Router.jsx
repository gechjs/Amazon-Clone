import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Payment from "./pages/Payment/Payment";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import NotFound from "./pages/NotFound/NotFound";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";

const stripePromise = loadStripe("pk_test_51Q2ZwFHhXh1ZQXaCoDWoRxHUlEiVyJxIoUZXVU9EOxBfjulhcQEsyBUuC4uYgvfIy60UFYoGniLGRcL0GMKFdFi800m8LFtZ4s");

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              redirect="/orders"
              msg="You must log in to access your orders"
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              redirect="/payment"
              msg="You must log in to pay"
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/results" element={<Results />} />
        <Route path="category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
