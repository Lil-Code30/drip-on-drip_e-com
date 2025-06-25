import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import QuantityBox from "../components/QuantityBox";

export default function Cart() {
  const { cart, DeleteProductFromCart } = useCart();

  const cartElements = cart.map((item) => {
    return (
      <tr key={item.id} className="text-sm">
        <td>
          <div className="flex item-center">
            <img
              className="size-10 md:size-20"
              src={item.productImage}
              alt={item.name}
            />
            <p className="self-center">{item.name}</p>
          </div>
        </td>
        <td className="px-0.5">{item.price} $CAD</td>
        <td className="px-0.5">
          <QuantityBox key={item.id} quantity={item.quantity} />
        </td>
        <td className="px-0.5">{item.quantity * item.price} $CAD</td>
        <td className="px-0.5 text-red-600">
          <button
            className="hover:cursor-pointer"
            title="Delete product from cart"
            onClick={() => DeleteProductFromCart(item.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {cart.length > 0 ? (
        <section className="flex flex-col md:flex-row gap-y-2 md:gap-x-2">
          <div className="border-1 md:w-2/3 border-gray-400 py-2">
            <h1 className="text-xl md:text-2xl pl-3 py-2 font-semibold">
              Shopping Cart
            </h1>
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
            <div className="flex items-center justify-between px-2 py-2 border-t border-gray-400">
              <Link
                to="/shop"
                className="flex  gap-x-1 border-2 py-1 px-1.5 border-blue-500 text-blue-500 font-medium text-md hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in"
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
              <button className="border-2 py-1 px-1.5 border-blue-500 text-blue-500 font-medium text-md hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in">
                Update Cart
              </button>
            </div>
          </div>
          <div className="md:w-1/3 flex flex-col gap-y-5">
            <div className="border border-gray-400">
              <h2 className="text-lg py-2 pl-2 font-medium">Card Totals</h2>
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
