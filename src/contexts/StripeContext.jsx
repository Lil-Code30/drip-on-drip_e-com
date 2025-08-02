import React, { createContext, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY
);

const StripeContext = createContext();

export const useStripe = () => useContext(StripeContext);

export const StripeProvider = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeContext.Provider value={{}}>{children}</StripeContext.Provider>
    </Elements>
  );
};
