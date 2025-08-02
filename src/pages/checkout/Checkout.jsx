import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import ShippingInfos from "../../components/checkout/ShippingInfos";
import BillingInfos from "../../components/checkout/BillingInfos";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../../api";
import { useUser } from "../../contexts/UserInfosContext";
import {
  PayPal,
  DebitOrCreditCard,
} from "../../components/product/PaymentOption";
import StripePaymentForm from "../../components/checkout/StripePaymentForm";
export default function Checkout() {
  const [isShipAddress, setIsShipAddress] = useState(false);
  const [isOptionMethod, setIsOptionMethod] = useState("stripe");
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const { userInfos } = useUser();

  const checkoutForm = useForm({
    defaultValues: {
      billingFirstName: "",
      billingLastName: "",
      billingEmail: "",
      billingPhone: "",
      billingAddressLine1: "",
      billingAddressLine2: "",
      billingCity: "",
      billingState: "",
      billingPostalCode: "",
      billingCountry: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingEmail: "",
      shippingPhone: "",
      shippingAddressLine1: "",
      shippingAddressLine2: "",
      shippingCity: "",
      shippingState: "",
      shippingPostalCode: "",
      shippingCountry: "",
      orderNote: "",
      paymentMethod: "stripe",
      shippingAddress: false,
      paypalEmail: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
      cardHolderName: "",
    },
  });

  const location = useLocation();
  const { dataInfos } = location.state;
  const { cart } = useCart();
  const paymentMethods = [
    {
      id: "stripe",
      name: "Credit/Debit Card (Stripe)",
    },
    {
      id: "paypal",
      name: "Paypal",
    },
  ];

  const placeOrderMutation = useMutation({
    mutationFn: async (checkoutData) => {
      const orderItems = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));

      const data = await createPayment(
        userInfos.token,
        userInfos.user.userId,
        orderItems,
        checkoutData
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("Order placed successfully:", data);
      setClientSecret(data.paymentIntent.client_secret);
      setOrderId(data.orderId);
    },
    onError: (error) => {
      console.log("Error when placing order: " + error.response.data.message);
      setPaymentError(error.response.data.message);
    },
  });

  // handle success payment
  const handlePaymentSuccess = (paymentResult) => {
    console.log("Payment successful:", paymentResult);
    setPaymentSuccess(true);
    setPaymentError(null);
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    setPaymentError(error.message);
    setPaymentSuccess(false);
  };

  // function to verify which option method is selected
  const displayPaymentField = () => {
    switch (isOptionMethod) {
      case "stripe":
        return (
          <StripePaymentForm
            checkoutForm={checkoutForm}
            clientSecret={clientSecret}
            onPaymentError={handlePaymentError}
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      case "paypal":
        return <PayPal checkoutForm={checkoutForm} />;
      default:
        return null;
    }
  };

  const orderSummaryEl = cart?.map((item) => {
    return (
      <div key={item.id} className="flex items-center">
        <div>
          <img
            className="size-[50px]"
            src={item.product.images[0]}
            alt={item.product.name}
          />
        </div>
        <div>
          <h4 className="text-sm">{item.product.name}</h4>
          <p className="text-[11px]">
            {item.quantity} x{" "}
            <span className="text-blue-500">{item.price} $CAD</span>
          </p>
        </div>
      </div>
    );
  });
  const paymentMethodsEl = paymentMethods.map((method) => {
    return (
      <label
        key={method.id}
        className={`border flex items-center justify-center gap-x-1 border-gray-400 w-30 h-20 p-3 rounded hover:cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in ${
          isOptionMethod === method.id ? "bg-gray-200" : ""
        }`}
      >
        <p className="text-sm">{method.name}</p>
        <input
          type="radio"
          value={method.id}
          name="paymentMethod"
          id="paymentMethod"
          onChange={() => setIsOptionMethod(method.id)}
        />
      </label>
    );
  });

  const onSubmit = (data) => {
    placeOrderMutation.mutate(data);
  };

  return (
    <>
      <form
        onSubmit={checkoutForm.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row  gap-y-3 md:gap-x-3"
      >
        <div className="md:w-2/3">
          <h1 className="text-2xl">Billing Information</h1>
          <div className="w-full">
            <section>
              <BillingInfos checkoutForm={checkoutForm} />
              <label htmlFor="shippingAddress" className="text-gray-500">
                <input
                  type="checkbox"
                  name="shippingAddress"
                  id="shippingAddress"
                  checked={isShipAddress}
                  onChange={() => setIsShipAddress((prev) => !prev)}
                />{" "}
                Ship into different address
              </label>
              {isShipAddress && <ShippingInfos checkoutForm={checkoutForm} />}
            </section>
            <section className="my-3 border border-gray-400 p-3 rounded">
              <h2 className="text-lg">Payment Option</h2>
              <div className="flex gap-x-1.5 my-1.5 items-center w-full">
                {paymentMethodsEl}
              </div>
              <div className="my-2">{displayPaymentField()}</div>
            </section>
            <section className="my-3 p-3 ">
              <h2 className="text-lg">Additional informations </h2>
              <p className="text-sm">
                Order Notes{" "}
                <span className="text-gray-400">&#40;Optional&#41;</span>
              </p>
              <textarea
                name="orderNote"
                rows={6}
                id="orderNote"
                {...checkoutForm.register("orderNote")}
                placeholder="Notes about your order, e.g. special notes for delivery."
                className="border border-gray-400 w-full my-1 p-1 rounded"
              ></textarea>
              {paymentError && (
                <div className="text-red-500 text-sm">{paymentError}</div>
              )}
              {paymentSuccess && (
                <div className="text-green-500 text-sm">
                  Payment successful! Order ID: {orderId}
                </div>
              )}
            </section>
          </div>
        </div>
        <div className="md:w-1/3 h-fit border border-gray-400/50 px-2 py-3">
          <h2 className="font-medium text-lg my-2.5">Order Summary</h2>
          {orderSummaryEl}
          <h3 className="flex justify-between items-center m-3">
            <span className="font-normal text-gray-500">Sub-total</span>{" "}
            <span className="font-medium">{dataInfos.subtotal} $CAD</span>
          </h3>
          <h3 className="flex justify-between items-center m-3">
            <span className="font-normal text-gray-500">Shipping</span>{" "}
            <span className="font-medium">Free</span>
          </h3>
          <h3 className="flex justify-between items-center m-3">
            <span className="font-normal text-gray-500">Discount</span>{" "}
            <span className="font-medium">0 $CAD</span>
          </h3>
          <h3 className="flex justify-between items-center m-3">
            <span className="font-normal text-gray-500">Tax</span>{" "}
            <span className="font-medium">{dataInfos.tax} $CAD</span>
          </h3>
          <hr className="mx-3 border border-gray-400 my-2" />
          <h3 className="flex justify-between items-center m-3">
            <span className="font-medium text-xl ">Total</span>{" "}
            <span className="font-semibold text-xl">
              {dataInfos.total} $CAD
            </span>
          </h3>
          <button
            type="submit"
            className="flex items-center justify-center w-full gap-x-1  bg-orange-500 text-white h-9 rounded font-medium px-1"
          >
            {placeOrderMutation.isLoading ? (
              <span className="loading loading-bars loading-md"></span>
            ) : (
              <span>PLACE ORDER</span>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
