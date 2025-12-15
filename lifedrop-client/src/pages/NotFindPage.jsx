import React from "react";
import { Link } from "react-router";

const NotFindPage = () => {
  return (
    <div className="flex justify-center items-center w-full text-center min-h-[calc(100vh-275px)]">
      <div>
        <h2 className="text-3xl text-gray-500 font-bold mb-5">
          Page Not Found!
        </h2>
        <p className=" text-gray-400 mb-2 ">
          The page you looking for <br />
          dose not exist.
        </p>
        <Link to={"/"} className="btn primary text-white">
          {" "}
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFindPage;
