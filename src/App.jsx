import AppRouter from "./routes/AppRoutes";
import { ProductProvider } from "./contexts/ProductsContext";
import { WishListProvider } from "./contexts/WishListContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishListProvider>
          <AppRouter />
        </WishListProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
