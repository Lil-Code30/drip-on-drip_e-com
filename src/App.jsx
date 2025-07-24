import AppRouter from "./routes/AppRoutes";
import { ProductProvider } from "./contexts/ProductsContext";
import { WishListProvider } from "./contexts/WishListContext";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserInfosContext";
import ToastNotify from "./components/common/ToastNotify";

function App() {
  return (
    <ProductProvider>
      <UserProvider>
        <CartProvider>
          <WishListProvider>
            <>
              <ToastNotify />
              <AppRouter />
            </>
          </WishListProvider>
        </CartProvider>
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
