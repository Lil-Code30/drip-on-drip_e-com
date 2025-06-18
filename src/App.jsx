import AppRouter from "./routes/AppRoutes";
import { ProductProvider } from "./contexts/ProductsContext";

function App() {
  return (
    <ProductProvider>
      <AppRouter />
    </ProductProvider>
  );
}

export default App;
