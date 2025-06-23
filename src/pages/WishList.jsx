import { useWishList } from "../contexts/WishListContext";
import ProductCard from "../components/ProductCard";

export default function WishList() {
  const { wishList } = useWishList();

  const wishListEl = wishList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  return (
    <>
      {wishList.length > 0 ? (
        <section className="grid grid-cols-3 gap-2 md:grid-cols-4">
          {wishListEl}
        </section>
      ) : (
        <div className="flex-center h-[50vh]">
          <p className="text-2xl font-semibold text-gray-600">
            No Product in you WishList
          </p>
        </div>
      )}
    </>
  );
}
