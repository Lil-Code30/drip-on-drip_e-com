import { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../components/ToastNotify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartDB = JSON.parse(localStorage.getItem("myCart")) || [];
  const [cart, setCart] = useState(cartDB);

  // adding a product to the cart
  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : { ...item }
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  // delete product from cart
  const DeleteProductFromCart = (productID) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productID));
    showToast("Product removed from cart!", "error"); // 'error' type is red
  };

  // increment quantity
  const incrementQuantity = (productId) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : { ...item }
      )
    );

  // decrement quantity
  const decrementQuantity = (productId) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity < 2 ? 1 : item.quantity - 1 }
          : { ...item }
      )
    );
  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        DeleteProductFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

/*
cart format 
myCart = [
{
id: 2,
name:
productImage:
quantity:
price:

}

]

*/
