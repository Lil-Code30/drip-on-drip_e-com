import { useProducts } from "../../contexts/ProductsContext";
import ProductCard from "../../components/ProductCard";

export default function Shop() {
  const { allProducts } = useProducts();

  const productsEl = allProducts.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });
  return (
    <section>
      <div className="flex py-10 px-15 bg-black text-white">
        <div className="">
          <h1 className="text-4xl md:text-5xl my-1.5 font-bold">Shop Men's</h1>
          <p className="w-[90%] not-odd:md:w-[50%]">
            Revamp your style with the latest designer trends in men’s clothing
            or achieve a perfectly curated wardrobe thanks to our line-up of
            timeless pieces.
          </p>
        </div>
      </div>
      <section className="p-3 md:px-5 pt-5 flex gap-x-3 ">
        <aside className="">
          <div className="flex gap-x-1.5">
            <h2 className="text-2xl font-semibold">Filters</h2>
            <button className="hover:cursor-pointer underline text-sm text-gray-400">
              Clear filter
            </button>
          </div>
          <form action="" className="mt-2">
            <h2 className="text-lg">Categories</h2>
            <div className="flex flex-col gap-y-0.5 mt-2">
              <label>
                <input type="checkbox" name="men-shirts" id="men-shirts" /> Men
                Shirts
              </label>
              <label>
                <input type="checkbox" name="men-shoes" id="men-shoes" /> Men
                Shoes
              </label>
            </div>
          </form>
        </aside>
        <div className="flex flex-col">
          <div className="self-end-safe">
            <form className="border w-[180px] my-1.5 flex justify-between px-1 ">
              <label htmlFor="sort" className="text-gray-400">
                Sort By
              </label>
              <select name="sort" id="sort" className="font-semibold">
                <option disabled>--select--</option>
                <option value="popular">Popular</option>
                <option value="latest">Latest</option>
                <option value="increasing-order">A - Z</option>
                <option value="decreasing-order">Z - A</option>
              </select>
            </form>
            <p className="text-md mb-2">Showing 1003 Products</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 p-3 bg-red-100/30">
            {productsEl}
          </div>
        </div>
      </section>
    </section>
  );
}
