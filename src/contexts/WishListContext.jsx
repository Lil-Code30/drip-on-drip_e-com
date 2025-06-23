import { createContext, useContext, useEffect, useState } from "react";

const WishListContext = createContext();

export function WishListProvider({ children }) {
  const wishListDB = JSON.parse(localStorage.getItem("wishList")) || [];
  const [wishList, setWishList] = useState(wishListDB);

  // store data to wishlist localstorage every time the wishlist change
  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  // add a product to wishList
  const addToWishList = (product) => {
    setWishList((prev) => [...prev, product]);
  };

  // remove a product from wishList
  const removeFromWishList = (productId) => {
    setWishList((prev) => prev.filter((el) => el.id !== productId));
  };

  return (
    <WishListContext.Provider
      value={{ wishList, addToWishList, removeFromWishList }}
    >
      {children}
    </WishListContext.Provider>
  );
}

export const useWishList = () => useContext(WishListContext);
