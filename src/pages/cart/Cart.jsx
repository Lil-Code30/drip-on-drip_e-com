import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

import CartElement from "../../components/product/CartElement";

export default function Cart() {
  const { cart, clearUserCartFn, updateCartQuantities, localCart } = useCart();
  // if not cart mean user not connected
  if (!cart) {
    return (
      <div className="flex-center flex-col gap-y-2 h-[50vh]">
        <p className="text-2xl font-semibold text-gray-600">
          User must be connected in order to access your cart
        </p>
        <div className="flex-center gap-x-3">
          <Link
            to="/login"
            className="border-2 py-1 px-0.5 border-blue-500 text-blue-500 font-semibold text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border-2 py-1 px-0.5 border-blue-500 text-blue-500 font-semibold text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in"
          >
            Signup
          </Link>
        </div>
      </div>
    );
  }

  const cartElements = localCart.map((item) => {
    return <CartElement key={item.id} item={item} />;
  });

  let subTotal = 0;

  localCart.map((el) => {
    el.price * el.quantity;
    subTotal = subTotal + el.price * el.quantity;
  });

  let GST = (5 / 100) * subTotal;
  let QST = (9.975 / 100) * subTotal;
  let tax = GST + QST;
  let total = subTotal + GST + QST;
  const dataInfos = {
    tax: tax.toFixed(2),
    total: total.toFixed(2),
    subtotal: subTotal.toFixed(2),
  };

  return (
    <>
      {localCart.length > 0 ? (
        <section className="flex flex-col md:flex-row gap-y-2 md:gap-x-2">
          <div className="border-1 md:w-2/3 h-fit border-gray-400 py-2">
            <div className="flex  justify-between px-2 items-center">
              <h1 className="text-xl md:text-2xl pl-3 py-2 font-semibold">
                Shopping Cart
              </h1>
              <button
                className="border rounded bg-orange-600/70 px-2 text-white"
                onClick={clearUserCartFn}
              >
                Clear Cart
              </button>
            </div>
            <table className="w-full mb-1.5">
              <thead>
                <tr className="bg-gray-300 text-black text-center uppercase text-sm">
                  <th className="py-2 font-medium">Product</th>
                  <th className="py-2 font-medium">Price</th>
                  <th className="py-2 font-medium">Quantity</th>
                  <th className="py-2 font-medium">Sub-Total</th>
                  <th className="py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>{cartElements}</tbody>
            </table>
            <hr className="border-gray-400" />
            <div className="flex  justify-between px-2 items-center mt-3">
              <Link
                to="/shop"
                className="flex  gap-x-1 border-2 py-1 ml-2  w-1/3 px-1.5 border-blue-500 text-blue-500 font-medium text-md hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in"
              >
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
                    d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>Return to Shop</span>
              </Link>
              <button
                onClick={updateCartQuantities}
                className="bg-blue-600 px-2 rounded text-white py-1 hover:cursor-pointer hover:bg-blue-400"
              >
                Update Cart
              </button>
            </div>
          </div>
          <div className="md:w-1/3 flex flex-col gap-y-5">
            <div className="border border-gray-400 pb-2.5">
              <h2 className="text-lg py-2 pl-2 font-medium">Cart Totals</h2>
              <h3 className="flex justify-between items-center m-3">
                <span className="font-normal text-gray-500">Sub-total</span>{" "}
                <span className="font-medium">{subTotal.toFixed(2)} $CAD</span>
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
                <span className="font-medium">{tax.toFixed(2)} $CAD</span>
              </h3>
              <hr className="mx-3 border border-gray-400 my-2" />
              <h3 className="flex justify-between items-center m-3">
                <span className="font-medium text-xl ">Total</span>{" "}
                <span className="font-semibold text-xl">
                  {total.toFixed(2)} $CAD
                </span>
              </h3>
              <Link
                to="/checkout"
                state={{
                  dataInfos,
                }}
                className="flex items-center justify-center gap-x-1 mx-3 bg-orange-500 text-white h-9 rounded font-medium"
              >
                <span>Proceed to Checkout</span>
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
            <div className="border border-gray-400">
              <h2 className="border-b border-gray-400 text-lg py-2 pl-2 font-medium">
                Coupon Code
              </h2>
              <form action="" className="flex flex-col gap-y-2 px-2 py-3">
                <input
                  className="border border-gray-400 rounded pl-1 h-10"
                  type="text"
                  name="coupon"
                  id="coupon"
                  placeholder="Enter your coupon code here "
                />
                <button className="bg-blue-600 w-[40%] rounded text-white py-1 hover:cursor-pointer hover:bg-blue-400">
                  Apply Coupon
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex-center flex-col gap-y-2 h-[50vh]">
          <p className="text-2xl font-semibold text-gray-600">
            No Product in your Cart
          </p>
          <Link
            to="/shop"
            className="border-2 py-1 px-0.5 border-blue-500 text-blue-500 font-semibold text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </>
  );
}
