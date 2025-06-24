export default function ProductDescription({ currentProduct }) {
  return (
    <>
      <h3 className="text-lg font-semibold">Description:</h3>
      <p className="text-lg">{currentProduct.description}</p>
      <table>
        <tbody>
          <tr>
            <th className="text-left p-1">Category:</th>
            <td>{currentProduct.category}</td>
          </tr>
          <tr>
            <th className="text-left p-1">Brand:</th>
            <td>{currentProduct.brand}</td>
          </tr>
          <tr>
            <th className="text-left p-1">Weight:</th>
            <td>{currentProduct.weight}Kg</td>
          </tr>
        </tbody>
      </table>

      <table className="border my-2">
        <thead>
          <tr>
            <th colSpan={2}>
              <h3 className="text-lg font-semibold">Dimensions</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="border p-2 text-left">Width</th>
            <td className="border p-1">{currentProduct.dimensions.width}</td>
          </tr>
          <tr>
            <th className="border p-2 text-left">Height</th>
            <td className="border p-1">{currentProduct.dimensions.height}</td>
          </tr>
          <tr>
            <th className="border p-2 text-left">Depth</th>
            <td className="border p-1">{currentProduct.dimensions.depth}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
