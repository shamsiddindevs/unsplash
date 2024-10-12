import ImageContainer from "../components/ImageContainer";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Download = () => {
  const {
    likedImages: { download },
  } = useGlobalContext();
  console.log(download);

  return (
    <>
      {download.length != 0 ? (
        <ImageContainer allImages={download} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-10 text-center">
          <p className="text-2xl md:text-4xl">You don't have download image</p>
          <Link to={"/"} className="btn btn-secondary btn-sm md:btn-md">
            Back Home
          </Link>
        </div>
      )}
    </>
  );
};

export default Download;
