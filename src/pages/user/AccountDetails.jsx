import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../components/common/ToastNotify";
import { updateUserProfile, changeUserPassword } from "../../api";

const AccountDetails = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const { userProfile } = useOutletContext();
  const updateProfileForm = useForm({
    defaultValues: {
      firstName: userProfile?.data?.firstName,
      lastName: userProfile?.data?.lastName,
      dateOfBirth: userProfile?.data?.dateOfBirth?.split("T")[0],
      gender: userProfile?.data?.gender,
    },
  });
  const changePasswordForm = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const updateProfileQuery = useMutation({
    mutationFn: async (formData) => {
      const data = await updateUserProfile(userProfile?.token, formData);
      return data;
    },
    onSuccess: () => {
      showToast("user profile updated successfully", "success");
    },
    onError: (error) => {
      showToast(`Error: ${error.response.data.message}`, "error");
    },
  });

  const changeUserPasswordQuery = useMutation({
    mutationFn: async (formData) => {
      const data = await changeUserPassword(userProfile?.token, formData);
      console.log(formData)
      return data;
    },
    onSuccess: () => {
      setErrorMsg("");
      showToast("user password updated successfully", "success");
    },
    onError: (error) => {
      setErrorMsg(`Error: ${error.response.data.message}`);
    },
  });
  const onSubmitProfile = (data) => {
    updateProfileQuery.mutate(data);
  };
  const onSubmitPassword = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setErrorMsg("The two password doesnot match");
      return;
    }
    changeUserPasswordQuery.mutate(data);
  };

  useEffect(() => {
    if (userProfile) {
      updateProfileForm.reset({
        firstName: userProfile?.data?.firstName,
        lastName: userProfile?.data?.lastName,
        dateOfBirth: userProfile?.data?.dateOfBirth?.split("T")[0],
        gender: userProfile?.data?.gender,
      });
    }
  }, [userProfile, updateProfileForm]);

  return (
    <>
      <section className="w-full">
        <p className="text-sm pb-2">
          <Link className="underline" to="/profile">
            My Account
          </Link>{" "}
          &gt; <span className="text-gray-500">Account Details</span>
        </p>
        <div className="flex flex-col md:flex-row gap-1 justify-between w-full">
          <div className="w-full md:w-[70%] ">
            <h2 className="w-full bg-gray-300 border-gray-300 flex items-center justify-between py-1.5 px-1">
              Account Information
            </h2>
            <form
              onSubmit={updateProfileForm.handleSubmit(onSubmitProfile)}
              className="py-1.5 w-full md:w-2/3"
            >
              <div class="mb-3">
                <label
                  for="first-name"
                  class="block mb-1 text-sm font-medium text-gray-900 "
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  {...updateProfileForm.register("firstName", {
                    required: true,
                  })}
                  class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>
              <div class="mb-3">
                <label
                  for="last-name"
                  class="block mb-1 text-sm font-medium text-gray-900 "
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  {...updateProfileForm.register("lastName", {
                    required: true,
                  })}
                  class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>
              <div class="mb-3">
                <label
                  for="dob"
                  class="block mb-1 text-sm font-medium text-gray-900 "
                >
                  Date Of Birth *
                </label>
                <input
                  type="date"
                  id="dob"
                  {...updateProfileForm.register("dateOfBirth", {
                    required: true,
                  })}
                  class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>
              <div class="mb-3">
                <label class="block mb-1 text-sm font-medium text-gray-900 ">
                  Gender (optional)
                </label>
                <div className="flex items-cente gap-x-8">
                  <label>
                    Male{" "}
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      {...updateProfileForm.register("gender")}
                    />
                  </label>
                  <label>
                    Female{" "}
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      {...updateProfileForm.register("gender")}
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </form>

            <h2 className="w-full bg-gray-300 border-gray-300 flex items-center justify-between py-1.5 px-1 mt-2">
              Log Informations
            </h2>
            <form
              onSubmit={changePasswordForm.handleSubmit(onSubmitPassword)}
              className="my-2"
            >
              <div class="mb-3">
                <label
                  for="oldpassword"
                  class="block mb-1 text-sm font-medium text-gray-900 "
                >
                  Old Password *
                </label>
                <input
                  type="password"
                  id="oldpassword"
                  name="oldpassword"
                  {...changePasswordForm.register("oldPassword", {
                    required: true,
                  })}
                  class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div class="mb-3">
                <label
                  for="newpassword"
                  class="block mb-1 text-sm font-medium text-gray-900 "
                >
                  New Password *
                </label>
                <input
                  type="password"
                  id="newpassword"
                  name="newpassword"
                  {...changePasswordForm.register("newPassword", {
                    required: true,
                  })}
                  class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div class="mb-1">
                <label
                  for="confirmpassword"
                  class="block mb-1 text-sm font-medium text-gray-900 "
                >
                  Confirmn Password *
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  {...changePasswordForm.register("confirmPassword", {
                    required: true,
                  })}
                  class="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="mb-1">
                <Link
                  to="/forgot-password"
                  class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Forgot Password?
                </Link>
              </div>
              {errorMsg && (
                <span className="text-red-600 my-3 text-sm text-center block">
                  {errorMsg}
                </span>
              )}
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </form>
          </div>
          <div className="w-full md:w-[30%]">
            <h2 className="bg-gray-300 border-gray-300 flex items-center justify-between py-1.5 px-1 mb-1">
              Your Data
            </h2>
            <div className="flex flex-col">
              <button
                type="button"
                class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Close Account
              </button>
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountDetails;
