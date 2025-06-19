export default function ProductAdditionalInfos({ currentProduct }) {
  return (
    <>
      <table className="border my-2">
        <tr>
          <th className="text-left p-1 border bg-gray-300">
            Warranty Information
          </th>
          <td className="p-1 border ">{currentProduct.warrantyInformation}</td>
        </tr>
        <tr>
          <th className="text-left p-1 border bg-gray-300">
            Shipping Information
          </th>
          <td className="p-1 border ">{currentProduct.shippingInformation}</td>
        </tr>
        <tr>
          <th className="text-left p-1 border bg-gray-300">
            Availability Status
          </th>
          <td className="p-1 border ">{currentProduct.availabilityStatus}</td>
        </tr>
        <tr>
          <th className="text-left p-1 border bg-gray-300">Return Policy</th>
          <td className="p-1 border ">{currentProduct.returnPolicy}</td>
        </tr>
        <tr>
          <th className="text-left p-1 border bg-gray-300">
            Minimum Order Quantity
          </th>
          <td className="p-1 border ">{currentProduct.minimumOrderQuantity}</td>
        </tr>
      </table>
    </>
  );
}
