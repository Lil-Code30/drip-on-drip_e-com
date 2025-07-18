// fetch all active porducts in db
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

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
    console.log(
      `something when wrong when fetching all products ${err.message}`
    );
  }
};
