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

// function to create user account
export const createUser = async (email, password) => {
  const res = await api.post("/auth/register", { email, password });
  const { data } = res;
  return data;
};

// function to connect user to his/her account
export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  const { data } = res;
  return data;
};

// function to ask for a new email verification code
export const requestVerificationCode = async (token) => {
  const res = await api.get("/auth/request-email-verification-code", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data } = res;
  return data;
};

// function to verify user account
export const verifyAccount = async (token, codes) => {
  console.log("Frontend - codes parameter:", codes);
  const res = await api.post(
    "/auth/verify-email",
    {
      code: codes,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { data } = res;
  return data;
};

// function to get user cart
export const getUserCart = async (userId) => {
  const res = await api.get(`/cart?userId=${userId}`);

  const { data } = res;

  return data;
};

//function to add product to cart
export const addProductToCart = async (productData) => {
  const res = await api.post(`/cart`, {
    userId: productData.userId,
    price: productData.price,
    productId: productData.productId,
    quantity: productData.quantity,
  });

  const { data } = res;

  return data;
};

// function to delete product from the cart
export const deleteProductFromCart = async (userId, productId) => {
  const res = await api.delete(
    `/cart/user-cart?userId=${userId}&productId=${productId}`
  );

  const { data } = res;

  return data;
};

// function to clear cart
export const clearCart = async (userId) => {
  const res = await api.delete(`/cart/${userId}`);

  const { data } = res;

  return data;
};

//function to update quantity
export const updateCartQuantities = async (userId, cartItems) => {
  const res = await api.put(`/cart/`, {
    userId,
    cartItems,
  });

  const { data } = res;

  return data;
};

// function to get user profile
export const getUserProfile = async (token) => {
  const res = await api.get(`/user/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data } = res;

  return data;
};

// function to update user profile
export const updateUserProfile = async (token, userData) => {
  const res = await api.put(
    `/user/profile/`,
    {
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { data } = res;

  return data;
};

// function to change user password
export const changeUserPassword = async (token, userPasswords) => {
  const res = await api.put(
    `/user/change-password`,
    {
      oldPassword: userPasswords.oldPassword,
      newPassword: userPasswords.newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { data } = res;

  console.log(userPasswords)
  return data;
};
