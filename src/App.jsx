import AppRouter from "./routes/AppRoutes";
import { ProductProvider } from "./contexts/ProductsContext";
import { WishListProvider } from "./contexts/WishListContext";

function App() {
  return (
    <ProductProvider>
      <WishListProvider>
        <AppRouter />
      </WishListProvider>
    </ProductProvider>
  );
}

export default App;
