import { Link } from "react-router-dom";

const PaymentDetails = () => {
  return (
    <>
      <section className="w-full">
        <p className="text-sm pb-2">
          <Link className="underline" to="/profile">
            My Account
          </Link>{" "}
          &gt; <span className="text-gray-500">Payments Details</span>
        </p>
        <h3 className="my-3 text-2xl">No credit card added</h3>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          Add Credit Card
        </button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Click the button below to close</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default PaymentDetails;
