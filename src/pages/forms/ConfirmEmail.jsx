import { useState } from "react";
import { verifyAccount, requestVerificationCode } from "../../api";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "../../contexts/UserInfosContext";
import { showToast } from "../../components/ToastNotify";
import CountDownTimer from "../../components/CountDownTimer";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [time, setTime] = useState(0);
  const [sendCode, setSendCode] = useState(false);

  const { userInfos, handleUser } = useUser();

  const token = userInfos.token;

  const verifyAccountQuery = useMutation({
    mutationFn: async (formData) => {
      const data = await verifyAccount(token, formData.code);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("userInfos", JSON.stringify(data));
      handleUser(data);
      setErrorMsg("");

      showToast("Account verified successfully", "success");
      navigate("/");
    },
    onError: (error) => {
      setErrorMsg(`Error: ${error.response.data.message}`);
    },
  });

  const sendVerificationCode = useQuery({
    queryKey: ["verificationCode"],
    queryFn: async () => {
      const data = await requestVerificationCode(token);
      return data;
    },
    enabled: !!sendCode,
  });

  // if (sendVerificationCode.isEnabled) {
  //   setErrorMsg("");
  //   showToast("Verification code sent");
  // }
  const handleRequestCode = () => {
    try {
      setSendCode(true);
      setTime(120);
    } catch (err) {
      console.log(err.message);
    } finally {
      setSendCode(false);
    }
  };

  // handle code submission
  const handleSubmit = (formData) => {
    const code1 = formData.get("verification-code1");
    const code2 = formData.get("verification-code2");
    const code3 = formData.get("verification-code3");
    const code4 = formData.get("verification-code4");
    const code5 = formData.get("verification-code5");
    const code6 = formData.get("verification-code6");

    if (code1 && code2 && code3 && code4 && code5 && code6) {
      setErrorMsg("");
      const codes = code1 + code2 + code3 + code4 + code5 + code6;
      const code = { codes };

      verifyAccountQuery.mutate(code);
    }
  };
  return (
    <div className="flex flex-col gap-y-3">
      <form
        class="max-w-sm mx-auto font-inter  mt-10  flex flex-col gap-y-3"
        action={handleSubmit}
      >
        <h5 class="text-2xl  text-center font-geist font-semibold text-gray-900">
          Verification Code
        </h5>
        <p className="text-center text-gray-500">
          Enter the verification code send to your email address
          <br />
        </p>
        <div class="mb-1 mt-2">
          <div class="flex gap-x-5">
            <input
              type="number"
              id="verification-code"
              name="verification-code1"
              class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold text-center"
              required
            />
            <input
              type="number"
              id="verification-code"
              name="verification-code2"
              class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold text-center"
              required
            />
            <input
              type="number"
              id="verification-code"
              name="verification-code3"
              class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold text-center"
              required
            />
            <input
              type="number"
              id="verification-code"
              name="verification-code4"
              class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold text-center"
              required
            />
            <input
              type="number"
              id="verification-code"
              name="verification-code5"
              class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold text-center"
              required
            />
            <input
              type="number"
              id="verification-code"
              name="verification-code6"
              class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold text-center"
              required
            />
          </div>
        </div>
        {errorMsg && (
          <span className="text-red-600  text-sm text-center">{errorMsg}</span>
        )}
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Confirm
        </button>
      </form>
      <div className="flex items-center justify-center gap-x-2">
        <p className="text-center text-gray-500">
          Resend Code in{" "}
          <span className="text-black font-semibold">
            {<CountDownTimer time={time} setTime={setTime} />}
          </span>
        </p>{" "}
        {time === 0 ? (
          <button
            onClick={() => handleRequestCode()}
            className="border bg-gray-500 px-2 rounded"
          >
            Resend
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
