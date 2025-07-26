import { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../components/common/ToastNotify";
import { useUser } from "./UserInfosContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getUserCart,
  addProductToCart,
  deleteProductFromCart,
  clearCart,
  updateCartQuantities as updateCartQuantitiesAPI,
} from "../api";

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
      // refetch cart when any action has been done in the cart
      cartQuery.refetch();
    },
    onError: (error) => {
      showToast(`Error: ${error.response.data.message}`, "error");
    },
  });

  const deleteProductQuery = useMutation({
    mutationFn: async (productData) => {
      const data = await deleteProductFromCart(
        userInfos.user.userId,
        productData.productId
      );
      return data;
    },
    onSuccess: (data) => {
      showToast(data.message, "success");
      cartQuery.refetch();
    },
    onError: (error) => {
      showToast(`Error: ${error.response.data.message}`, "error");
    },
  });

  const clearUserCart = useMutation({
    mutationFn: async () => {
      const data = await clearCart(userInfos.user.userId);
      return data;
    },
    onSuccess: (data) => {
      showToast(data.message, "success");
      cartQuery.refetch();
    },
    onError: (error) => {
      showToast(`Error: ${error.response.data.message}`, "error");
    },
  });

  const [cart, setCart] = useState(cartQuery.data); // true cart from backend
  const [localCart, setLocalCart] = useState(cartQuery.data); // UI-only cart
  const [cartDirty, setCartDirty] = useState(false); // track if localCart differs

  // adding a product to the cart (immediately updates backend)
  const addToCart = (product) => {
    const productData = {
      userId: userInfos.user.userId,
      price: product.price,
      productId: product.id,
      quantity: product.quantity,
    };
    addProductToCartQuery.mutate(productData);
  };

  // delete product from cart (immediately updates backend)
  const DeleteProductFromCart = (productId) => {
    const data = { productId };
    deleteProductQuery.mutate(data);
  };

  // clear user cart (immediately updates backend)
  const clearUserCartFn = () => {
    clearUserCart.mutate();
  };

  // increment quantity (UI only)
  const incrementQuantity = (productId) => {
    setLocalCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : { ...item }
      )
    );
    setCartDirty(true);
  };

  // decrement quantity (UI only)
  const decrementQuantity = (productId) => {
    setLocalCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity < 2 ? 1 : item.quantity - 1 }
          : { ...item }
      )
    );
    setCartDirty(true);
  };

  // update cart quantities in backend (batch update)
  const updateCartQuantitiesMutation = useMutation({
    mutationFn: async (cartItems) => {
      // cartItems: array of { productId, quantity }
      const data = await updateCartQuantitiesAPI(
        userInfos.user.userId,
        cartItems
      );
      return data;
    },
    onSuccess: (data) => {
      showToast(data.message || "Cart updated!", "success");
      cartQuery.refetch();
      setCartDirty(false);
    },
  });

  // Call this to send local cart changes to backend
  const updateCartQuantities = () => {
    if (!localCart || localCart.length === 0) return;
    const cartItems = localCart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    showToast("Cart updated!", "success");
    updateCartQuantitiesMutation.mutate(cartItems);
  };
  useEffect(() => {
    setCart(cartQuery.data);
    setLocalCart(cartQuery.data);
    setCartDirty(false);
  }, [cartQuery.data]);

  // Clear cart on logout
  useEffect(() => {
    if (!userInfos.user || !userInfos.user.userId) {
      setCart([]);
      setLocalCart([]);
      setCartDirty(false);
    }
  }, [userInfos]);

  return (
    <CartContext.Provider
      value={{
        cart, // backend cart
        localCart, // UI cart (use this for display and editing)
        addToCart,
        DeleteProductFromCart,
        incrementQuantity,
        decrementQuantity,
        clearUserCartFn,
        updateCartQuantities, // call this on 'Update Cart' button click
        cartDirty, // expose if UI needs to know if there are unsaved changes
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
