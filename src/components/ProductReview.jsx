export default function ProductReview({ reviews }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const reviewsEl = reviews.map((review, index) => {
    const date = new Date(review.date);
    const day = String(date.getDate());
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const formattedDate = `${months[Number(month) - 1]} ${day}, ${year}`;

    const starArray = [];
    const reviewNumber = review.rating;
    const EmptyStar = [];

    for (let i = 0; i < reviewNumber; i++) {
      starArray.push("star");
    }
    for (let i = 0; i < 5 - reviewNumber; i++) {
      EmptyStar.push("empty-star");
    }

    const reviewStarEl = starArray.map((el, index) => {
      return (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 fill-amber-400"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      );
    });

    const EmptyStarEL = EmptyStar.map((el, index) => {
      return (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 fill-gray-300"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      );
    });

    const reviewStar = reviewStarEl.concat(EmptyStarEL);

    return (
      <div
        key={index}
        className="my-2.5 border border-gray-400 shadow-sm rounded-lg p-1.5"
      >
        <div className="flex  gap-x-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-15"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </span>
          <div className="justify-self-start">
            <h1 className="font-medium">{review.reviewerName}</h1>
            <div className="flex items-center gap-x-0.5">{reviewStar}</div>
          </div>
        </div>
        <h2 className="text-xl font-semibold">{review.comment}</h2>
        <p className="text-gray-600">
          Posted on{" "}
          <span className="font-medium text-md text-black">
            {formattedDate}
          </span>
        </p>
      </div>
    );
  });
  return (
    <>
      <h2 className="text-2xl font-semibold my-2">Customer Reviews</h2>
      <div className="mb-2">{reviewsEl}</div>
      <hr />
      <form className="mt-3">
        <h2 className="text-3xl font-medium">Add Your Review</h2>
        <div>
          <h3 className="font-semibold text-xl">Your Rating</h3>
        </div>
        <div className="flex flex-col gap-y-2 mb-5 ">
          <label htmlFor="reviewerName" className="font-semibold text-xl">
            Name
          </label>
          <input
            className="border rounded h-10 px-1 outline-0"
            type="text"
            name="reviewerName"
            id="reviewerName"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2 mb-5 ">
          <label htmlFor="reviewerEmail" className="font-semibold text-xl">
            Email Address
          </label>
          <input
            className="border rounded h-10 px-1 outline-0"
            type="email"
            name="reviewerEmail"
            id="reviewerEmail"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2 mb-5 ">
          <label htmlFor="comment" className="font-semibold text-xl">
            Your Review
          </label>
          <textarea
            className="border rounded  p-1 outline-0"
            rows={5}
            name="comment"
            id="comment"
            required
          ></textarea>
        </div>
        <button className="w-20 bg-black text-white rounded py-1.5 text-lg font-medium">
          Submit
        </button>
      </form>
    </>
  );
}
