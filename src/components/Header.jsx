import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NavLinks } from "../data";
import { useWishList } from "../contexts/WishListContext";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const [menuChecked, setMenuChecked] = useState(false);
  const { wishList } = useWishList();
  const { cart } = useCart();

  const handleMenuChecked = () => {
    setMenuChecked((prev) => !prev);
  };

  const NavLinksEl = NavLinks.map((link) => {
    return (
      <NavLink
        onClick={handleMenuChecked}
        key={link.id}
        to={link.to}
        className={({ isActive }) =>
          isActive ? "nav-link active-link " : "nav-link"
        }
      >
        {link.name}
      </NavLink>
    );
  });
  return (
    <header className="text-black relative  flex justify-between items-center md:px-1.5 py-3">
      <Link to="/" className="font-stalinst text-xl order-2 md:order-1">
        drip<span className="text-red-500 font-stalinst text-2xl">On</span>drip
      </Link>
      <div className="order-1 md:order-2 ">
        <label htmlFor="menu" className="peer md:hidden">
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
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>

          <input
            type="checkbox"
            checked={menuChecked}
            name="menu"
            id="menu"
            className="hidden"
            onChange={handleMenuChecked}
          />
        </label>
        <nav className="hidden absolute top-0  md:relative peer-has-checked:flex md:flex flex-col md:flex-row gap-x-2  text-black  font-geist slide-in bg-red-500 md:bg-transparent z-9 h-[100dvh] w-[100dvw]  md:size-auto">
          <div className="md:hidden flex items-center justify-between px-2 bg-white">
            <Link to="/" className="font-stalinst text-xl ">
              drip
              <span className="text-red-500 font-stalinst text-2xl">On</span>
              drip
            </Link>
            <button
              onClick={handleMenuChecked}
              className="hover:cursor-pointer  self-end-safe m-2 bg-red-500 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {NavLinksEl}{" "}
        </nav>
      </div>
      <div className="flex items-center gap-x-2 justify-self-end-safe order-3">
        <Link to="cart" className="flex-center relative">
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span className="bg-red-600 absolute text-white rounded-full size-5 flex-center text-sm p-1.5 -top-1 -right-2">
            {cart.length}
          </span>
        </Link>
        <Link title="Wishlist" to="wishlist" className="flex-center relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span className="absolute text-[11px]">{wishList.length}</span>
        </Link>
        <Link
          to="login"
          className="bg-black text-white font-semibold py-1 px-2 rounded hover:bg-white hover:border hover:text-black transition-all duration-300"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
