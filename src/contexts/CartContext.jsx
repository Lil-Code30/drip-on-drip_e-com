import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartDB = JSON.parse(localStorage.getItem("myCart")) || [];
  const [cart, setCart] = useState(cartDB);

  // adding a product to the cart
  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart((prevCart) =>
        prevCart.map((item) => ({
          ...item,
          quantity: item.quantity + product.quantity,
        }))
      );
    } else {
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
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
