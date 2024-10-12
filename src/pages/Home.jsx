import React from "react";
import Search from "../components/Search";
import { useActionData } from "react-router";
import useFetch from "../hooks/useFetch";
import { useState, useEffect, useRef } from "react";
import ImageContainer from "../components/ImageContainer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  if (!search) {
    toast.warning("Please enter words!", {
      position: "top-center",
    });
    return null;
  } else {
    return search;
  }
};

// let a = useFetch('https://jsonplaceholder.typicode.com/todos/1');

const Home = () => {
  const [PAGE_NUMBER, setPAGE_NUMBER] = useState(1);
  const searchParamFromAction = useActionData();
  const [allImages, setAllImages] = useState([]);
  // console.log(import.meta.env.VITE_ACCESS_KEY);

  const prevSearchParam = useRef(searchParamFromAction);

  const { isPending, error, data } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=` +
      import.meta.env.VITE_ACCESS_KEY +
      `&query=${searchParamFromAction || "all"}&page=${PAGE_NUMBER}`,
  );

  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImages) =>
        PAGE_NUMBER == 1 ? data.results : [...prevImages, ...data.results],
      );
    }
  }, [data]);

  if (isPending) return <p className="align-center">Loading...</p>;
  if (error) return <p className="align-center">Error: {error}</p>;

  // useFetch
  //  console.log(prevSearchParam);
  //  console.log(searchParamFromAction)

  useEffect(() => {
    if (prevSearchParam !== searchParamFromAction) {
      setPAGE_NUMBER(1);
      setAllImages([]);
      prevSearchParam == searchParamFromAction;
    }
  }, [searchParamFromAction]);

  function addPage() {
    setPAGE_NUMBER(PAGE_NUMBER + 1);
  }

  return (
    <div className="align-center">
      <div className="my-5">
        <Search />
      </div>
      {allImages.length ? (
        <ImageContainer allImages={allImages} />
      ) : (
        <div className="text-center">
          <p className="my-10 text-2xl md:text-4xl">No Images</p>
          <Link to={"/"} className="btn btn-secondary btn-sm md:btn-md">
            Back Home
          </Link>
        </div>
      )}
      {allImages.length ? (
        <div className="my-10">
          <button
            onClick={addPage}
            className="btn btn-secondary btn-sm w-full md:btn-md"
          >
            Read More
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
