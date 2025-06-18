const categories = ["mens-shirts", "mens-shoes"];

// fetch all products

export async function getProducts() {
  const result = await Promise.all(
    categories.map(async (category) => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await res.json();
      return data.products.map((product) => ({ ...product, category }));
    })
  );
  const allProducts = result.flat();

  return allProducts;
}
