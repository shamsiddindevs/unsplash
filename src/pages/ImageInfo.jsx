import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";

const ImageInfo = () => {
  const { id } = useParams();
  const { data, pending, error } = useFetch(
    `https://api.unsplash.com/photos/${id}?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }`,
  );
  console.log(data);
  return (
    <>
      <div className="align-center py-5">
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
          {/* Image Section */}
          <img
            src={data?.urls.regular}
            alt="Sample Image"
            className="w-full max-w-sm rounded-lg shadow-2xl"
          />
          {/* Text Section */}
          <div className="max-w-lg md:ml-4">
            <h1 className="text-xl uppercase md:text-xl">
              {data?.alt_description}
            </h1>
            <p className="py-6">
              We are committed to delivering high-quality services and solutions
              that meet the needs of our customers. Our mission is to provide
              excellent and innovative services that contribute to the growth
              and success of our clients.
            </p>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageInfo;
