import AppRouter from "./routes/AppRoutes";
import { WishListProvider } from "./contexts/WishListContext";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserInfosContext";
import ToastNotify from "./components/common/ToastNotify";

function App() {
  return (
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
  );
}

export default App;
