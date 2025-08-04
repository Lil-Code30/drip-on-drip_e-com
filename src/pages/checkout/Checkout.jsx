import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import ShippingInfos from "../../components/checkout/ShippingInfos";
import BillingInfos from "../../components/checkout/BillingInfos";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPaymentIntent } from "../../api";
import { useUser } from "../../contexts/UserInfosContext";
import { PayPal } from "../../components/product/PaymentOption";
import StripePaymentForm from "../../components/checkout/StripePaymentForm";
import Loading from "../../components/common/Loading";

export default function Checkout() {
  const [isShipAddress, setIsShipAddress] = useState(false);
  const [isOptionMethod, setIsOptionMethod] = useState("stripe");
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { userInfos } = useUser();
  const { clearUserCartFn } = useCart();
  const navigate = useNavigate();

  const checkoutForm = useForm({
    defaultValues: {
      billingFirstName: "",
      billingLastName: "",
      billingEmail: "",
      billingPhoneNumber: "",
      billingAddressLine1: "",
      billingAddressLine2: "",
      billingCity: "",
      billingState: "",
      billingPostalCode: "",
      billingCountry: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingEmail: "",
      shippingPhoneNumber: "",
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
      name: "Credit/Debit Card",
    },
    {
      id: "paypal",
      name: "Paypal",
    },
  ];

  // STEP 1: Create order + payment intent (order status = "pending")
  const createPaymentIntentMutation = useMutation({
    mutationFn: async (checkoutData) => {
      const orderItems = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));

      const data = await createPaymentIntent(
        userInfos.token,
        userInfos.user.userId,
        orderItems,
        checkoutData,
        checkoutData.orderNote || ""
      );
      return data;
    },
    onSuccess: (data) => {
      // Store the response data
      setClientSecret(data.clientSecret);
      setOrderId(data.orderId);
      setPaymentError(null);
      setIsProcessingPayment(false);

      // Show success message
      setPaymentSuccess(true);
      setTimeout(() => setPaymentSuccess(false), 5000); // Clear after 3 seconds
    },
    onError: (error) => {
      console.log(
        "Error creating order: " + error.response?.data?.message ||
          error.message
      );

      setPaymentError(
        error.response?.data?.message || "Failed to create order"
      );
      setIsProcessingPayment(false);
    },
  });

  // handle success payment
  const handlePaymentSuccess = async (paymentResult) => {
    console.log("Payment successful:", paymentResult);
    setPaymentSuccess(true);
    setPaymentError(null);
    setIsProcessingPayment(false);

    // Get form data
    const formData = checkoutForm.getValues();

    // Prepare order details for success page
    const successOrderDetails = {
      orderId: orderId,
      total: dataInfos.total,
      subtotal: dataInfos.subtotal,
      tax: dataInfos.tax,
      items: cart, // Include cart items for order summary
      billingFirstName: formData.billingFirstName,
      billingLastName: formData.billingLastName,
      billingEmail: formData.billingEmail,
      billingPhoneNumber: formData.billingPhoneNumber,
      billingAddressLine1: formData.billingAddressLine1,
      billingAddressLine2: formData.billingAddressLine2,
      billingCity: formData.billingCity,
      billingState: formData.billingState,
      billingPostalCode: formData.billingPostalCode,
      billingCountry: formData.billingCountry,
      shippingFirstName:
        formData.shippingFirstName || formData.billingFirstName,
      shippingLastName: formData.shippingLastName || formData.billingLastName,
      shippingEmail: formData.shippingEmail || formData.billingEmail,
      shippingPhoneNumber:
        formData.shippingPhoneNumber || formData.billingPhoneNumber,
      shippingAddressLine1:
        formData.shippingAddressLine1 || formData.billingAddressLine1,
      shippingAddressLine2:
        formData.shippingAddressLine2 || formData.billingAddressLine2,
      shippingCity: formData.shippingCity || formData.billingCity,
      shippingState: formData.shippingState || formData.billingState,
      shippingPostalCode:
        formData.shippingPostalCode || formData.billingPostalCode,
      shippingCountry: formData.shippingCountry || formData.billingCountry,
      paymentMethod: isOptionMethod,
      paymentStatus: "succeeded",
      transactionId: paymentResult.id,
    };

    // Clear cart after successful payment
    clearUserCartFn();

    // Redirect to success page with order details
    navigate("/checkout/success", {
      state: { orderDetails: successOrderDetails },
    });
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    setPaymentError(error.message);
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
  };

  // function to verify which option method is selected
  const displayPaymentField = () => {
    // Only show payment form if order is prepared (clientSecret exists)
    if (!clientSecret) {
      return (
        <div className="text-center py-4 text-gray-500">
          Click "PREPARE PAYMENT" to set up your payment method
        </div>
      );
    }

    switch (isOptionMethod) {
      case "stripe":
        return (
          <StripePaymentForm
            checkoutForm={checkoutForm}
            clientSecret={clientSecret}
            onPaymentError={handlePaymentError}
            onPaymentSuccess={handlePaymentSuccess}
            isProcessing={isProcessingPayment}
            onPaymentStart={() => setIsProcessingPayment(true)}
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
        className={`border flex items-center justify-center gap-x-1 border-gray-400 w-30 h-20 p-3 rounded transition-all duration-300 ease-in ${
          isOptionMethod === method.id ? "bg-gray-200" : ""
        } ${
          clientSecret
            ? "hover:cursor-pointer hover:bg-gray-200"
            : "opacity-50 cursor-not-allowed"
        }`}
      >
        <p className="text-sm">{method.name}</p>
        <input
          type="radio"
          value={method.id}
          name="paymentMethod"
          id="paymentMethod"
          disabled={!clientSecret}
          onChange={() => setIsOptionMethod(method.id)}
        />
      </label>
    );
  });

  const onSubmit = (data) => {
    // Validate required fields
    const requiredFields = [
      "billingFirstName",
      "billingLastName",
      "billingEmail",
      "billingPhoneNumber",
      "billingAddressLine1",
      "billingCity",
      "billingState",
      "billingPostalCode",
      "billingCountry",
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      setPaymentError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    // If payment is already prepared, trigger payment
    if (clientSecret && isOptionMethod === "stripe") {
      // Payment form will handle the actual payment
      return;
    }

    // For Stripe, create payment intent first
    if (isOptionMethod === "stripe") {
      setIsProcessingPayment(true);
      setPaymentError(null); // Clear any previous errors
      createPaymentIntentMutation.mutate(data);
    } else {
      // For other payment methods, handle differently
      console.log("Other payment method selected:", isOptionMethod);
    }
  };

  return (
    <>
      {/* Full-screen loading overlay */}
      {createPaymentIntentMutation.isLoading && (
        <Loading fullScreen={true} message="Preparing payment..." />
      )}

      {/* Payment processing overlay */}
      {isProcessingPayment && !createPaymentIntentMutation.isLoading && (
        <Loading fullScreen={true} message="Processing payment..." />
      )}

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
            disabled={
              createPaymentIntentMutation.isLoading || isProcessingPayment
            }
            className="flex items-center justify-center w-full gap-x-1  bg-orange-500 text-white h-9 rounded font-medium px-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {createPaymentIntentMutation.isLoading ? (
              <span className="loading loading-bars loading-md"></span>
            ) : (
              <span>
                {clientSecret
                  ? "PAY NOW"
                  : isOptionMethod === "stripe"
                  ? "PREPARE PAYMENT"
                  : "PLACE ORDER"}
              </span>
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
          <br />
          {paymentError && (
            <div className="text-red-500 text-sm">{paymentError}</div>
          )}
          {paymentSuccess && (
            <div className="text-green-500 text-sm">
              {clientSecret
                ? "Payment prepared! Enter your card details above."
                : `Payment successful! Order ID: ${orderId}`}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
