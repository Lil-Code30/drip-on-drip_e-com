import AppRouter from "./routes/AppRoutes";
import { ProductProvider } from "./contexts/ProductsContext";
import { WishListProvider } from "./contexts/WishListContext";
import { CartProvider } from "./contexts/CartContext";
import ToastNotify from "./components/ToastNotify";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishListProvider>
          <>
            <ToastNotify />
            <AppRouter />
          </>
        </WishListProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
