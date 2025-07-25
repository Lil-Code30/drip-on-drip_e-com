import { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../components/common/ToastNotify";
import { useUser } from "./UserInfosContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserCart, addProductToCart } from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userInfos } = useUser();
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await getUserCart(userInfos.user.userId);
      return data;
    },
  });

  const addProductToCartQuery = useMutation({
    mutationFn: async (productData) => {
      const data = await addProductToCart(productData);
      return data;
    },
    onSuccess: (data) => {
      showToast(data.message, "success");
    },
    onError: (error) => {
      showToast(`Error: ${error.response.data.message}`, "error");
    },
  });

  const [cart, setCart] = useState(cartQuery.data);

  // adding a product to the cart
  const addToCart = (product) => {
    const productData = {
      userId: userInfos.user.userId,
      price: product.price,
      productId: product.id,
      quantity: product.quantity,
    };
    addProductToCartQuery.mutate(productData);
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
    setCart(cartQuery.data);
  }, [cartQuery.data, userInfos]);

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
