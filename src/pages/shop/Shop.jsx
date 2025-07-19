import { useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import SearchBar from "../../components/SearchBar";
import { Funnel, Star, AlignLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts, searchProduct } from "../../api";

export default function Shop() {
  const [sortBy, setSortBy] = useState("latest");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [rating, setRating] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["mens-shirts", "mens-shoes"];

  const productQuery = useQuery({
    queryKey: ["products", selectedCategories, priceRange, rating],
    queryFn: async () => {
      const data = await getAllProducts(selectedCategories, priceRange, rating);
      return data;
    },
  });

  // handle search term
  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const searchTermQuery = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      const data = await searchProduct(searchTerm);
      return data;
    },
  });

  //handle category change
  const handleCategory = (cat) => {
    // verify if the  category is inside the selected categories array
    const categoryIn = selectedCategories.includes(cat);
    if (categoryIn) {
      // remove the category if true
      setSelectedCategories((prev) => prev.filter((c) => c !== cat));
    } else {
      // add the category if false
      setSelectedCategories((prev) => [...prev, cat]);
    }
  };
  // function to clear the filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 500 });
    setRating(1);
    setSortBy("latest");
  };

  //  sorted data
  const SortedProducts = useMemo(() => {
    if (productQuery.data) {
      return productQuery.data.sort((a, b) => {
        switch (sortBy) {
          case "latest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "highest-rated":
            return b.rating - a.rating;
          case "highest-price":
            return b.price - a.price;
          case "lowest-price":
            return a.price - b.price;
          case "a-z":
            return a.name.localeCompare(b.name);
          case "z-a":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }
  }, [productQuery.data, sortBy]);

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
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          title="open filter menu"
          className="hover:cursor-pointer mt-5  border-2 rounded p-0.5 flex-center"
        >
          <AlignLeft />
        </button>
      </div>
      <section className="relative p-3 md:pt-2 md:px-5  flex gap-x-3 ">
        <aside
          className={`${
            menuOpen ? "absolute" : "hidden md:block"
          }  md:relative z-99 bg-white md:bg-transparent p-2 border md:border-0 rounded w-[250px] md:w-1/3`}
        >
          <div className="flex items-center gap-x-1.5">
            <h2 className="flex-center text-2xl font-semibold pr-2">
              <Funnel />
              Filters
            </h2>
            <button
              onClick={clearFilters}
              className="hover:cursor-pointer underline text-sm text-gray-400"
            >
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
                  <span key={category} className="flex items-center gap-x-0.5 ">
                    <input
                      type="checkbox"
                      name={category}
                      id={category}
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategory(category)}
                      className="hover:cursor-pointer"
                    />
                    <label htmlFor={category} className="hover:cursor-pointer">
                      {categoryName}
                    </label>
                  </span>
                );
              })}
            </div>
            <h2 className="text-lg font-semibold mt-1">Price Range</h2>
            <div className="flex items-center gap-x-1 mb-2">
              <label className="w-full">
                Min Price
                <input
                  className="w-full border border-gray-400 rounded pl-0.5"
                  type="number"
                  name="minPrice"
                  value={priceRange.min}
                  min={0}
                  max={500}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                />
              </label>
              <label className="w-full">
                Max Price
                <input
                  className="w-full border border-gray-400 rounded pl-0.5"
                  type="number"
                  name="maxPrice"
                  value={priceRange.max}
                  min={0}
                  max={500}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                />
              </label>
            </div>
            <input
              type="range"
              value={priceRange.max}
              min={priceRange.min}
              max={500}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
              className="w-full"
            />
            <div>
              <h2 className="text-lg font-semibold">Ratings</h2>
              <div className="flex flex-col gap-y-1 mt-0.5">
                {[1, 2, 3, 4].map((rate) => {
                  return (
                    <span key={rate} className="flex items-center gap-x-1">
                      <input
                        type="radio"
                        name="rating"
                        value={rate}
                        checked={rate === rating}
                        id={`rating-${rate}`}
                        className="hover:cursor-pointer"
                        onChange={(e) => setRating(Number(e.target.value))}
                      />
                      <label
                        htmlFor={`rating-${rate}`}
                        className="flex items-center gap-x-0.5 hover:cursor-pointer"
                      >
                        <Star
                          size={18}
                          className="fill-yellow-400 stroke-amber-400 "
                        />{" "}
                        {rate}+
                      </label>
                    </span>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              className="my-3 border rounded bg-green-600 font-inter px-2 text-white"
            >
              Apply filter
            </button>
          </form>
        </aside>
        <div className="flex flex-col w-full">
          <div className="flex w-full flex-col gap-y-3 md:flex-row items-center">
            <div className="w-full mx-2 md:w-2/3">
              <SearchBar
                searchTerm={searchTerm}
                handleSearchTerm={handleSearchTerm}
              />
            </div>
            <div>
              <form className="border w-fit my-1.5 flex justify-between px-1 ">
                <label htmlFor="sort" className="text-gray-400 mr-1">
                  Sort By
                </label>
                <select
                  name="sort"
                  id="sort"
                  value={sortBy}
                  className="font-semibold"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="highest-price">Price: High to Low</option>
                  <option value="lowest-price">Price: Low to High</option>
                  <option value="a-z">Name: A - Z</option>
                  <option value="z-a">Name: Z - A</option>
                </select>
              </form>
              {productQuery.data && (
                <p className="text-md mb-2">
                  Showing {productQuery.data.length} Products
                </p>
              )}
            </div>
          </div>
          {searchTerm ? (
            searchTermQuery.isFetching ? (
              <div className="bg-red-100/30 size-full flex-center h-[50dvh]">
                <Loading />
              </div>
            ) : searchTermQuery.isError ? (
              <div className="bg-red-100/30 size-full flex-center h-[50dvh]">
                <Error error="Error when searching products from the db" />
              </div>
            ) : searchTermQuery.data.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 p-3 bg-red-100/30">
                {searchTermQuery.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-red-100/30 size-full flex-center h-[50dvh]">
                <h1 className="text-xl">No Product Found</h1>
              </div>
            )
          ) : productQuery.isFetching ? (
            <div className="bg-red-100/30 size-full flex-center h-[50dvh]">
              <Loading />
            </div>
          ) : productQuery.isError ? (
            <div className="bg-red-100/30 size-full flex-center h-[50dvh]">
              <Error error="Error when fetching products from the db" />
            </div>
          ) : SortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 p-3 bg-red-100/30">
              {SortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-red-100/30 size-full flex-center h-[50dvh]">
              <h1 className="text-xl">No Product matches the Filters apply</h1>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
