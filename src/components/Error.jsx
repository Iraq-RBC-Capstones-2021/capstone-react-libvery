import React from "react";
import error from "../assets/error.svg";

function Error() {
  return (
    <div className="bg-primary h-screen font-sans flex flex-col justify-center">
      <h1 className="text-4xl font-semibold mr-28">Ooops,</h1>
      <p className="text-xl">There is no such a page</p>
      <img className="mx-auto sm:max-w-xl" src={error} alt="error" />
      <button
        type="button"
        className="bg-secondary text-Cards px-3 py-1 rounded-md mx-auto mt-8 text-2xl transform bg-opacity-90 hover:bg-opacity-100 focus:outline-none focus:ring-4 focus:ring-secondary focus:ring-opacity-50"
      >
        Back
      </button>
    </div>
  );
}

export default Error;
