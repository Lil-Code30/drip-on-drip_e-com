import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addNewUserAddress, deleteUserAddress } from "../../api";
import { showToast } from "../../components/common/ToastNotify";
import AddressCard from "../../components/profile/AddressCard";

const AllAdressess = () => {
  const { userProfile, userAdresses } = useOutletContext();

  const addUserAddress = useForm({
    defaultValues: {
      addressNickname: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      stateOrProvince: "",
      postalCode: "",
      country: "",
      isDefault: "",
      addressType: "",
    },
  });

  const addUserAddressQuery = useMutation({
    mutationFn: async (formData) => {
      const data = await addNewUserAddress(
        userProfile?.token,
        userProfile?.data?.id,
        formData
      );
      return data;
    },
    onSuccess: () => {
      addUserAddress.reset({
        addressNickname: "",
        phoneNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        stateOrProvince: "",
        postalCode: "",
        country: "",
        isDefault: "",
        addressType: "",
      });
      document.getElementById("add_address_modal").close();
      showToast("New adress created successfully", "success");
    },
    onError: (error) => {
      showToast(
        `Error when creating user address ${error.response.data.message}`,
        "error"
      );
    },
  });

  const deleteUserAddressQuery = useMutation({
    mutationFn: async (formData) => {
      const data = await deleteUserAddress(userProfile?.token, formData.id);
      return data;
    },
    onSuccess: () => {
      showToast("Address deleted successfully", "success");
    },
    onError: (error) => {
      showToast(
        `Error when deleting user address ${error.response.data.message}`,
        "error"
      );
    },
  });

  const onSubmitAddAddress = (data) => {
    addUserAddressQuery.mutate(data);
  };

  const onDeleteAddress = (id) => {
    const data = { id };
    deleteUserAddressQuery.mutate(data);
  };

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
            {userAdresses.length > 0 ? (
              <div className="flex w-full  flex-wrap gap-2 mt-2 ">
                {userAdresses.map((item) => (
                  <AddressCard
                    key={item.id}
                    addressInfos={item}
                    onDeleteAddress={onDeleteAddress}
                  />
                ))}
              </div>
            ) : (
              <h2>No Address added </h2>
            )}
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
              <form
                onSubmit={addUserAddress.handleSubmit(onSubmitAddAddress)}
                method="dialog"
              >
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
                    id="addressNickname"
                    name="addressNickname"
                    {...addUserAddress.register("addressNickname", {
                      required: true,
                    })}
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
                    id="phoneNumber"
                    name="phonenumber"
                    {...addUserAddress.register("phoneNumber", {
                      required: true,
                    })}
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
                    id="addressLine1"
                    name="addressLine1"
                    {...addUserAddress.register("addressLine1", {
                      required: true,
                    })}
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
                    id="addressLine2"
                    name="addressLine2"
                    {...addUserAddress.register("addressLine2", {
                      required: true,
                    })}
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
                    {...addUserAddress.register("city", {
                      required: true,
                    })}
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
                    {...addUserAddress.register("stateOrProvince", {
                      required: true,
                    })}
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
                    {...addUserAddress.register("postalCode", {
                      required: true,
                    })}
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
                    {...addUserAddress.register("country", {
                      required: true,
                    })}
                    class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Create
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </section>
    </>
  );
};

export default AllAdressess;
