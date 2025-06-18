import { createContext, useContext, useEffect } from "react";
import { allProducts } from "../data";

const ProductsContext = createContext();

export function ProductProvider({ children }) {
  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }, []);

  return (
    <ProductsContext.Provider value={{ allProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
