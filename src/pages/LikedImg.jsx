import {useGlobalContext} from "../hooks/useGlobalContext";
import ImageContainer from "../components/ImageContainer";
import { Link } from "react-router-dom";

const LikedImg = () => {
  const {
    likedImages: {liked},
  } = useGlobalContext();

  return (
    <>
      <>
        {liked.length != 0 ? (
          <ImageContainer allImages={liked} />
        ) : (
          <div className="text-center  h-full flex flex-col  justify-center items-center gap-10">
            <p className=" text-2xl md:text-4xl">You don't have liked image</p>
            <Link
              to={"/"}
              className="btn btn-sm md:btn-md btn-secondary">
              Back Home
            </Link>
          </div>
        )}
      </>
    </>
  );
};

export default LikedImg;
