import { useProducts } from "../../contexts/ProductsContext";
import ProductCard from "../../components/ProductCard";

export default function Shop() {
  const { allProducts } = useProducts();

  const productsEl = allProducts.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4 p-3 bg-red-100/30">
      {productsEl}
    </section>
  );
}
