import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { showToast } from "../common/ToastNotify";

const StripePaymentForm = ({
  checkoutForm,
  clientSecret,
  onPaymentSuccess,
  onPaymentError,
  isProcessing: isProcessingProp,
  onPaymentStart,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      showToast("Stripe is not loaded yet. Please try again later.", "error");
      return;
    }

    if (onPaymentStart) {
      onPaymentStart();
    }
    setIsProcessing(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name:
              checkoutForm.getValues("billingFirstName") +
              " " +
              checkoutForm.getValues("billingLastName"),
            email: checkoutForm.getValues("billingEmail"),
            phone: checkoutForm.getValues("billingPhoneNumber"),
            address: {
              line1: checkoutForm.getValues("billingAddressLine1"),
              line2: checkoutForm.getValues("billingAddressLine2"),
              city: checkoutForm.getValues("billingCity"),
              state: checkoutForm.getValues("billingState"),
              postal_code: checkoutForm.getValues("billingPostalCode"),
              country: checkoutForm.getValues("billingCountry"),
            },
          },
        },
      }
    );

    setIsProcessing(false);

    if (error) {
      onPaymentError(error);
      showToast(`Payment failed: ${error.message}`, "error");
    } else {
      onPaymentSuccess(paymentIntent);
      showToast("Payment successful!", "success");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor=""
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Card Number
        </label>
        <div className="border border-gray-300 rounded-md p-2">
          <CardNumberElement options={cardElementOptions} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expiration Date
          </label>
          <div className="border border-gray-300 rounded-md p-2">
            <CardExpiryElement options={cardElementOptions} />
          </div>
        </div>
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            CVC
          </label>
          <div className="border border-gray-300 rounded-md p-2">
            <CardCvcElement options={cardElementOptions} />
          </div>
        </div>
      </div>

      {clientSecret && (
        <button
          type="button"
          onClick={handlePayment}
          disabled={isProcessing || isProcessingProp}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessing || isProcessingProp ? "Processing..." : "Pay Now"}
        </button>
      )}

      {(isProcessing || isProcessingProp) && (
        <div className="text-center text-gray-600 text-sm">
          Please wait while we process your payment...
        </div>
      )}
    </div>
  );
};

export default StripePaymentForm;
