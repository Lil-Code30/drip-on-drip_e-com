import { Link } from "react-router-dom";
import { X, Trash, SquarePen } from "lucide-react";

const AllAdressess = () => {
  return (
    <>
      <section className="w-full">
        <p className="text-sm pb-2">
          <Link className="underline" to="/profile">
            My Account
          </Link>{" "}
          &gt; <span className="text-gray-500">All Addresses</span>
        </p>
        <div className="w-full  flex flex-col-reverse md:flex-row justify-between">
          <div className=" w-full md:w-[80%]">
            <h1 className="text-xl font-semibold">Adressess</h1>
            <div className="flex w-full  flex-wrap gap-2 mt-2 ">
              <div className="bg-gray-700/50 w-full md:w-fit p-2 text-sm rounded-md relative">
                <p>
                  <span className="font-bold">Address nickname : </span>
                  <span>quebec-1</span>
                </p>
                <p>
                  <span className="font-bold">Phone Number : </span>
                  <span>+1 234 321-6789</span>
                </p>
                <p>
                  <span className="font-bold">Address Line 1 : </span>
                  <span>123 streat dev tex</span>
                </p>
                <p>
                  <span className="font-bold">Address Line 2: </span>
                  <span>suite 21B</span>
                </p>
                <p>
                  <span className="font-bold">City : </span>
                  <span>Quebec City</span>
                </p>
                <p>
                  <span className="font-bold">State or Province : </span>
                  <span>Quebec</span>
                </p>
                <p>
                  <span className="font-bold">Postal Code: </span>
                  <span>1X2 G1M</span>
                </p>
                <p>
                  <span className="font-bold">Country : </span>
                  <span>Canada</span>
                </p>
                <div className="absolute right-2 bottom-2 flex gap-x-2 items-center ">
                  <button>
                    <Trash size={15} color="red" />
                  </button>
                  <button>
                    <SquarePen size={15} color="orange" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-700/50 w-full md:w-fit p-2 text-sm rounded-md relative">
                <p>
                  <span className="font-bold">Address nickname : </span>
                  <span>quebec-1</span>
                </p>
                <p>
                  <span className="font-bold">Phone Number : </span>
                  <span>+1 234 321-6789</span>
                </p>
                <p>
                  <span className="font-bold">Address Line 1 : </span>
                  <span>123 streat dev tex</span>
                </p>
                <p>
                  <span className="font-bold">Address Line 2: </span>
                  <span>suite 21B</span>
                </p>
                <p>
                  <span className="font-bold">City : </span>
                  <span>Quebec City</span>
                </p>
                <p>
                  <span className="font-bold">State or Province : </span>
                  <span>Quebec</span>
                </p>
                <p>
                  <span className="font-bold">Postal Code: </span>
                  <span>1X2 G1M</span>
                </p>
                <p>
                  <span className="font-bold">Country : </span>
                  <span>Canada</span>
                </p>
                <div className="absolute right-2 bottom-2 flex gap-x-2 items-center ">
                  <button>
                    <Trash size={15} color="red" />
                  </button>
                  <button>
                    <SquarePen size={15} color="orange" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-700/50 w-full md:w-fit p-2 text-sm rounded-md relative">
                <p>
                  <span className="font-bold">Address nickname : </span>
                  <span>quebec-1</span>
                </p>
                <p>
                  <span className="font-bold">Phone Number : </span>
                  <span>+1 234 321-6789</span>
                </p>
                <p>
                  <span className="font-bold">Address Line 1 : </span>
                  <span>123 streat dev tex</span>
                </p>
                <p>
                  <span className="font-bold">Address Line 2: </span>
                  <span>suite 21B</span>
                </p>
                <p>
                  <span className="font-bold">City : </span>
                  <span>Quebec City</span>
                </p>
                <p>
                  <span className="font-bold">State or Province : </span>
                  <span>Quebec</span>
                </p>
                <p>
                  <span className="font-bold">Postal Code: </span>
                  <span>1X2 G1M</span>
                </p>
                <p>
                  <span className="font-bold">Country : </span>
                  <span>Canada</span>
                </p>
                <div className="absolute right-2 bottom-2 flex gap-x-2 items-center ">
                  <button>
                    <Trash size={15} color="red" />
                  </button>
                  <button>
                    <SquarePen size={15} color="orange" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() =>
                document.getElementById("add_address_modal").showModal()
              }
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add New
            </button>
          </div>
          <dialog id="add_address_modal" className="modal">
            <div className="modal-box">
              <button
                onClick={() =>
                  document.getElementById("add_address_modal").close()
                }
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500 font-bold"
              >
                <X />
              </button>
              <form method="dialog">
                <h1 className="font-bold text-lg mb-3">Address informations</h1>

                <div class="mb-3">
                  <label
                    for="addressnickname"
                    class="block mb-1 text-sm font-medium text-gray-900 "
                  >
                    Address nickname *
                  </label>
                  <input
                    type="text"
                    id="addressnickname"
                    name="addressnickname"
                    class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="phonenumber"
                    class="block mb-1 text-sm font-medium text-gray-900 "
                  >
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="addressline1"
                    class="block mb-1 text-sm font-medium text-gray-900 "
                  >
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    id="addressline1"
                    name="addressline1"
                    class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="addressline1"
                    class="block mb-1 text-sm font-medium text-gray-900 "
                  >
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="addressline2"
                    name="addressline2"
                    class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="city"
                    class="block mb-1 text-sm font-medium text-gray-900 "
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="stateOrProvince"
                    class="block mb-1 text-sm font-medium text-gray-900 "
                  >
                    State or Province *
                  </label>
                  <input
                    type="text"
                    id="stateOrProvince"
                    name="stateOrProvince"
                    class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="postalCode"
                    class="block mb-1 text-sm font-medium text-gray-900 "
                  >
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="country"
                    class="block mb-1 text-sm font-medium text-gray-900 "
                  >
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </section>
    </>
  );
};

export default AllAdressess;

/*

{
  "address nickname"
  "phoneNumber": "+1 418-123-4567",
  "addressLine1": "123 Rue Saint-Jean",
  "addressLine2": "Appartement 5B",
  "city": "Québec",
  "stateOrProvince": "Québec",
  "postalCode": "G1R 5B1",
  "country": "Canada",
  "isDefault": true,
  "addressType": "Home"
}

*/
