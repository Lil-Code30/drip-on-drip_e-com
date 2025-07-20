// fetch all active products in db
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

//  function to fetch all the products
export const getAllProducts = async (
  categories = "",
  priceRange = "",
  productRating = ""
) => {
  try {
    //  category, minPrice, maxPrice, rating
    // category = mins-shirts,mens-shoes
    let res = "";
    if (categories || priceRange || productRating) {
      let categoryParams = "";
      if (categories) {
        const category = categories.join(",");
        categoryParams = `category=${category}`;
      }

      const minPrice = priceRange.min;
      const maxPrice = priceRange.max;
      const rating = productRating;

      res = await api.get(
        `/products?${
          categories ? categoryParams : ""
        }&minPrice=${minPrice}&maxPrice=${maxPrice}&rating=${rating}`
      );
    } else {
      res = await api.get("/products");
    }

    const { data } = res;
    return data;
  } catch (err) {
    console.log(`something when wrong when fetching all products ${err}`);
  }
};

// function to find a product by id
export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);

    const { data } = res;

    return data;
  } catch (err) {
    console.log(`Error when fetching product by id ${err.message}`);
  }
};

// function to search a product
export const searchProduct = async (term) => {
  try {
    const res = await api.get(`products/search?q=${term}`);

    const { data } = res;

    return data;
  } catch (err) {
    console.log(`Error when searching for the product ${err.message}`);
  }
};

// function to fetch 4 realted products
export const getRelatedProducts = async (id, category) => {
  try {
    const res = await api.get(`/products/category/${category}`);
    // return only 4 product and leave the product with the id passed in the query
    const { data } = res;

    // filter out the product with the id passed in the query
    const filteredData = data
      .filter((product) => product.id !== id)
      .slice(0, 4);

    return filteredData;
  } catch (err) {
    console.log(`Error when fetching related products ${err.message}`);
  }
};
