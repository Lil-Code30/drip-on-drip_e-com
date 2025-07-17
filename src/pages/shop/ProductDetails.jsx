import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import ProductCard from "../../components/ProductCard";
import AddToCartBtn from "../../components/AddToCartBtn";
import WishListBtn from "../../components/WishListBtn";
import QuantityBox from "../../components/QuantityBox";
import ProductDescription from "../../components/ProductDescription";
import ProductAdditionalInfos from "../../components/ProductAdditionalInfos";
import ProductReview from "../../components/ProductReview";

export default function ProductDetails() {
  const { id } = useParams();

  const [clothSizes, setClothSizes] = useState([
    { id: 1, size: "XS", selected: false },
    { id: 2, size: "S", selected: false },
    { id: 3, size: "M", selected: false },
    { id: 4, size: "L", selected: false },
    { id: 5, size: "XL", selected: false },
    { id: 6, size: "XXL", selected: false },
  ]);
  const [shoeSizes, setShoeSizes] = useState([
    { id: 1, size: 6, selected: false },
    { id: 2, size: 6.5, selected: false },
    { id: 3, size: 7, selected: false },
    { id: 4, size: 7.5, selected: false },
    { id: 5, size: 8, selected: false },
    { id: 6, size: 8.5, selected: false },
    { id: 7, size: 9, selected: false },
    { id: 8, size: 9.5, selected: false },
    { id: 9, size: 10, selected: false },
    { id: 10, size: 10.5, selected: false },
    { id: 11, size: 11, selected: false },
    { id: 12, size: 11.5, selected: false },
  ]);
  const [quantity, setQuantity] = useState(1);
  // state to verify which tap is active to display content
  const [activeTab, setActiveTab] = useState("Description");

  // increment quantity
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  // decrement quantity
  const decrementQuantity = () =>
    setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));

  // function to display the component that is active
  const displayActiveTabContent = () => {
    switch (activeTab) {
      case "Description":
        return <ProductDescription currentProduct={currentProduct} />;
      case "Informations":
        return <ProductAdditionalInfos currentProduct={currentProduct} />;
      case "Reviews":
        return <ProductReview reviews={currentProduct.reviews} />;
      default:
        return null;
    }
  };

  const allProducts = JSON.parse(localStorage.getItem("allProducts"));
  const currentProduct = allProducts.find(
    (product) => product.id === Number(id)
  );
  const relatedProduct = allProducts
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 4);

  const relatedProductEl = relatedProduct.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  const discountPercent = currentProduct.discountPercentage.toFixed() + "% OFF";
  const originalPrice =
    currentProduct.price / (1 - currentProduct.discountPercentage / 100);

  // handle shoe size
  const handleShoeSizeChange = (id) => {
    setShoeSizes((prev) => {
      return prev.map((el) => {
        return el.id === id
          ? { ...el, selected: !prev.selected }
          : { ...el, selected: false };
      });
    });
  };
  const shoesSizesEl = shoeSizes.map((size) => {
    return (
      <label
        key={size.size}
        onClick={() => handleShoeSizeChange(size.id)}
        className={`flex-center size-8 border rounded ${
          size.selected ? "bg-black text-white" : "text-black"
        }`}
      >
        <input
          className="hidden"
          type="radio"
          name="clothSize"
          value={size.size}
          onChange={() => handleShoeSizeChange(size.id)}
        />
        {size.size}
      </label>
    );
  });

  // handle shirts sizes
  const handleClothSizeChange = (id) => {
    setClothSizes((prev) => {
      return prev.map((el) => {
        return el.id === id
          ? { ...el, selected: !prev.selected }
          : { ...el, selected: false };
      });
    });
  };
  const clothSizesEl = clothSizes.map((size) => {
    return (
      <label
        key={size.size}
        onClick={() => handleClothSizeChange(size.id)}
        className={`flex-center size-8 border rounded ${
          size.selected ? "bg-black text-white" : "text-black"
        }`}
      >
        <input
          className="hidden"
          type="radio"
          name="clothSize"
          value={size.size}
          onChange={() => handleClothSizeChange(size.id)}
        />
        {size.size}
      </label>
    );
  });

  return (
    <section id="top" className="md:w-[80%] md:mx-auto mx-5">
      <div>
        <p>
          <Link to="/">Home</Link> &gt; <Link to="../shop">Shop</Link> &gt;{" "}
          <span>{currentProduct.title}</span>
        </p>
      </div>
      <section className="container w-full mt-5 mb-3 mx-auto flex flex-col md:flex-row gap-3">
        <div className=" md:w-[50%] grid grid-cols-3 gap-2">
          <div className="col-span-3 border border-gray-300 bg-amber-50/50">
            <img src={currentProduct.images[0]} alt={currentProduct.title} />
          </div>
          <div className="border border-gray-300 bg-amber-50/50">
            <img src={currentProduct.images[1]} alt={currentProduct.title} />
          </div>
          <div className="border border-gray-300 bg-amber-50/50">
            <img src={currentProduct.images[2]} alt={currentProduct.title} />
          </div>
          <div className="border border-gray-300 bg-amber-50/50">
            <img src={currentProduct.images[3]} alt={currentProduct.title} />
          </div>
        </div>
        <div className="md:w-[50%]">
          {currentProduct.discountPercentage.toFixed() > 0 ? (
            <div className=" bg-yellow-400 w-[100px] px-1 text-lg rounded-sm flex-center mb-2">
              <span>{discountPercent}</span>
            </div>
          ) : null}
          <h1 className="font-inter text-2xl md:text-3xl font-bold mt-1.5 md:mt-0">
            {currentProduct.title}
          </h1>
          <span className="bg-gray-100 text-gray-800 text-[10px] font-medium me-2 px-2.5 py-0.5 rounded-sm">
            sku : {currentProduct.sku}
          </span>
          <h2 className="my-2 flex justify-between items-center">
            {currentProduct.discountPercentage.toFixed() > 0 ? (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-2xl text-blue-500 font-semibold">
                  ${currentProduct.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className=" text-2xl text-blue-500 font-semibold">
                ${currentProduct.price.toFixed(2)}
              </span>
            )}
            {currentProduct.stock > 0 ? (
              <span className="bg-green-200 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm ">
                in stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">
                not available
              </span>
            )}
          </h2>
          {currentProduct.stock > 4 ? (
            <p className="flex items-center gap-0.5 text-sm text-gray-700 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 lucide lucide-box-icon lucide-box"
              >
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>{" "}
              <span>
                Only {currentProduct.stock} item&#40;s&#41; left in stock
              </span>
            </p>
          ) : null}
          <h3 className=" font-semibold mt-10">Select Size</h3>

          <div className="my-2 flex flex-wrap gap-2">
            {currentProduct.category.includes("shirts") ? (
              clothSizesEl
            ) : currentProduct.category.includes("shoes") ? (
              shoesSizesEl
            ) : (
              <p>No Size Found</p>
            )}
          </div>
          <div className="flex items-center my-2.5 w-full gap-x-2">
            <QuantityBox
              quantity={quantity}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
            <AddToCartBtn product={currentProduct} quantity={quantity} />
            <div className=" size-8 flex-center border rounded">
              <WishListBtn product={currentProduct} />
            </div>
          </div>
          <hr />
          <div className="hidden md:block">
            <p className="font-semibold text-lg mt-3">Short Description: </p>
            <p className="line-clamp-2">{currentProduct.description}</p>
          </div>
        </div>
      </section>
      <section className="my-5">
        <div className="flex gap-x-2 text-lg w-full border-b-3 border-gray-100 mb-2">
          <button
            onClick={() => setActiveTab("Description")}
            className={`hover:cursor-pointer ${
              activeTab === "Description" ? "border-b-3 border-black" : ""
            } `}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("Informations")}
            className={`hover:cursor-pointer ${
              activeTab === "Informations" ? "border-b-3 border-black" : ""
            }`}
          >
            Additional Informations
          </button>
          <button
            onClick={() => setActiveTab("Reviews")}
            className={`hover:cursor-pointer ${
              activeTab === "Reviews" ? "border-b-3 border-black" : ""
            }`}
          >
            Reviews
          </button>
        </div>
        <div>{displayActiveTabContent()}</div>
      </section>
      <section>
        <h1 className="text-3xl font-semibold">Related Products</h1>
        <div className="grid grid-cols-4 gap-x-2 my-3">{relatedProductEl}</div>
      </section>
    </section>
  );
}
