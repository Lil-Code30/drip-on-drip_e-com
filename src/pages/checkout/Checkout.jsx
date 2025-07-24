import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import {
  CashOption,
  VenmoOption,
  PayPal,
  AmazonPay,
  DebitOrCreditCard,
} from "../../components/product/PaymentOption";

export default function Checkout() {
  const [isShipAddress, setIsShipAddress] = useState(false);
  const [isOptionMethod, setIsOptionMethod] = useState("cash");

  const location = useLocation();
  const { dataInfos } = location.state;
  const { cart } = useCart();
  const paymentMethods = [
    {
      id: "cash",
      name: "Cash on Delivery",
    },
    {
      id: "venmo",
      name: "Venmo",
    },
    {
      id: "paypal",
      name: "Paypal",
    },
    {
      id: "amazonpay",
      name: "Amazon Pay",
    },
    {
      id: "card",
      name: "Debit/Credit Card",
    },
  ];

  // function to verify which option method is selected
  const displayPaymentField = () => {
    switch (isOptionMethod) {
      case "cash":
        return <CashOption />;
      case "venmo":
        return <VenmoOption />;
      case "paypal":
        return <PayPal />;
      case "amazonpay":
        return <AmazonPay />;
      case "card":
        return <DebitOrCreditCard />;
    }
  };

  const orderSummaryEl = cart.map((item) => {
    return (
      <div key={item.id} className="flex items-center">
        <div>
          <img
            className="size-[50px]"
            src={item.productImage}
            alt={item.name}
          />
        </div>
        <div>
          <h4 className="text-sm">{item.name}</h4>
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

  return (
    <>
      <section className="flex flex-col-reverse md:flex-row  gap-y-3 md:gap-x-3">
        <div className="md:w-2/3">
          <h1 className="text-2xl">Billing Information</h1>
          <form action="" className="w-full">
            <section>
              <div className="flex items-center gap-x-2 w-full my-2">
                <div>
                  <label className="block py-1"> User Name</label>
                  <div className="flex gap-x-2 w-full ">
                    <input
                      className="border border-gray-400 w-full rounded pl-1 h-8 "
                      placeholder="first name"
                      type="text"
                      name="firstname"
                    />
                    <input
                      className="border w-full border-gray-400 rounded pl-1 h-8 "
                      placeholder="last name"
                      type="text"
                      name="lastname"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block py-1">
                    Company Name{" "}
                    <span className="text-gray-400">&#40;Optional&#41;</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="border  border-gray-400 rounded pl-1 h-8 "
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block py-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="w-full border border-gray-400 rounded pl-1 h-8"
                />
              </div>
              <div className="my-2 flex items-center gap-x-2">
                <div className="w-full">
                  <label htmlFor="email" className="block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border border-gray-400 w-full rounded pl-1 h-8 "
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="tel" className="block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="tel"
                    id="tel"
                    className="border border-gray-400 w-full rounded pl-1 h-8 "
                  />
                </div>
              </div>
              <label htmlFor="billingAddress" className="text-gray-500">
                <input
                  type="checkbox"
                  name="billingAddress"
                  id="billingAddress"
                  checked={isShipAddress}
                  onChange={() => setIsShipAddress((prev) => !prev)}
                />{" "}
                Ship into different address
              </label>
              {isShipAddress && (
                <div>
                  <label htmlFor="shippingAddress" className="block py-1">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    name="shippingAddress"
                    id="shippingAddress"
                    className="w-full border border-gray-400 rounded pl-1 h-8"
                  />
                </div>
              )}
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
                className="border border-gray-400 w-full my-1 p-1 rounded"
              ></textarea>
            </section>
          </form>
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
          <Link
            to="/checkout"
            className="flex items-center justify-center gap-x-1 mx-3 bg-orange-500 text-white h-9 rounded font-medium"
          >
            <span>PLACE ORDER</span>
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
          </Link>
        </div>
      </section>
    </>
  );
}
