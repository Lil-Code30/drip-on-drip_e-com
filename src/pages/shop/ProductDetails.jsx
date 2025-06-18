import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  const allProducts = JSON.parse(localStorage.getItem("allProducts"));
  const currentProduct = allProducts.find(
    (product) => product.id === Number(id)
  );

  console.log(currentProduct);

  return (
    <section className="md:mx-10 mx-3">
      <div>
        <p>
          <Link to="/">Home</Link> &gt;{" "}
          <Link to="../shop" path="relative">
            Shop
          </Link>{" "}
          &gt; <span>{currentProduct.title}</span>
        </p>
      </div>
      <section>
        <div></div>
        <div></div>
      </section>
    </section>
  );
}
