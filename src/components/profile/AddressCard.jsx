import { Trash, SquarePen } from "lucide-react";

const AddressCard = ({ addressInfos, onDeleteAddress }) => {
  return (
    <div className="bg-gray-700/50 w-full md:w-fit p-2 text-sm rounded-md relative">
      <p>
        <span className="font-bold">Address nickname : </span>
        <span>{addressInfos.nickname}</span>
      </p>
      <p>
        <span className="font-bold">Phone Number : </span>
        <span>{addressInfos.phoneNumber}</span>
      </p>
      <p>
        <span className="font-bold">Address Line 1 : </span>
        <span>{addressInfos.addressLine1}</span>
      </p>
      <p>
        <span className="font-bold">Address Line 2: </span>
        <span>{addressInfos.addressLine2}</span>
      </p>
      <p>
        <span className="font-bold">City : </span>
        <span>{addressInfos.city}</span>
      </p>
      <p>
        <span className="font-bold">State or Province : </span>
        <span>{addressInfos.state}</span>
      </p>
      <p>
        <span className="font-bold">Postal Code: </span>
        <span>{addressInfos.postalCode}</span>
      </p>
      <p>
        <span className="font-bold">Country : </span>
        <span>{addressInfos.country}</span>
      </p>
      <div className="absolute right-2 bottom-2 flex gap-x-2 items-center ">
        <button onClick={() => onDeleteAddress(addressInfos.id)}>
          <Trash size={15} color="red" />
        </button>
        <button>
          <SquarePen size={15} color="orange" />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
