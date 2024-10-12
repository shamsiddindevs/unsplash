import { useGlobalContext } from "../hooks/useGlobalContext";
import ImageContainer from "../components/ImageContainer";
import { Link } from "react-router-dom";

const LikedImg = () => {
  const {
    likedImages: { liked },
  } = useGlobalContext();

  return (
    <>
      <>
        {liked.length != 0 ? (
          <ImageContainer allImages={liked} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-10 text-center">
            <p className="text-2xl md:text-4xl">You don't have liked image</p>
            <Link to={"/"} className="btn btn-secondary btn-sm md:btn-md">
              Back Home
            </Link>
          </div>
        )}
      </>
    </>
  );
};

export default LikedImg;
