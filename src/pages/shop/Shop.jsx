import { useProducts } from "../../contexts/ProductsContext";
import ProductCard from "../../components/ProductCard";
import { Funnel, SpaceIcon, Star } from "lucide-react";

export default function Shop() {
  const { allProducts } = useProducts();

  const categories = ["mens-shirts", "mens-shoes"];
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
        <aside className="w-1/3">
          <div className="flex items-center gap-x-1.5">
            <h2 className="flex-center text-2xl font-semibold pr-2">
              <Funnel />
              Filters
            </h2>
            <button className="hover:cursor-pointer underline text-sm text-gray-400">
              Clear filter
            </button>
          </div>
          <form action="" className="mt-2">
            <h2 className="text-lg font-semibold">Categories</h2>
            <div className="flex flex-col gap-y-0.5 mt-1">
              {categories.map((category) => {
                const c = category.split("-").join(" ");
                const categoryName = c[0].toUpperCase() + c.slice(1);
                return (
                  <span className="flex items-center gap-x-0.5">
                    <input type="checkbox" name={category} id={category} />
                    <label htmlFor={category}>{categoryName}</label>
                  </span>
                );
              })}
            </div>
            <h2 className="text-lg font-semibold">Price Range</h2>
            <div className="flex items-center gap-x-1 mt-1 mb-2">
              <input
                className="w-full border border-gray-400 rounded pl-0.5"
                type="number"
                name="minPrice"
                min={0}
              />
              <input
                className="w-full border border-gray-400 rounded pl-0.5"
                type="number"
                name="maxPrice"
                min={0}
                max={500}
              />
            </div>
            <input type="range" min={0} max={500} className="w-full" />
            <div>
              <h2 className="text-lg font-semibold">Ratings</h2>
              <div className="flex flex-col gap-y-1 mt-0.5">
                {[1, 2, 3, 4, 5].map((rate) => {
                  return (
                    <span key={rate} className="flex items-center gap-x-1">
                      <input type="radio" name="rating" id={`rating-${rate}`} />
                      <label
                        htmlFor={`rating-${rate}`}
                        className="flex items-center gap-x-0.5"
                      >
                        <Star
                          size={18}
                          className="fill-yellow-400 stroke-amber-400"
                        />{" "}
                        {rate}+
                      </label>
                    </span>
                  );
                })}
              </div>
            </div>
          </form>
        </aside>
        <div className="flex flex-col">
          <div className="self-end-safe">
            <form className="border w-fit my-1.5 flex justify-between px-1 ">
              <label htmlFor="sort" className="text-gray-400 mr-1">
                Sort By
              </label>
              <select name="sort" id="sort" className="font-semibold">
                <option value="latest">Latest</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="highest-price">Price: High to Low</option>
                <option value="lowest-price">Price: Low to High</option>
                <option value="a-z">Name: A - Z</option>
                <option value="z-a">Name: Z - A</option>
              </select>
            </form>
            <p className="text-md mb-2">
              Showing {allProducts.length} of {allProducts.length} Products
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 p-3 bg-red-100/30">
            {productsEl}
          </div>
        </div>
      </section>
    </section>
  );
}
