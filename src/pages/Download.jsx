import ImageContainer from "../components/ImageContainer";
import { Link } from "react-router-dom";
import {useGlobalContext} from "../hooks/useGlobalContext";


const Download = () => {
  const {
    likedImages: {download},
  } = useGlobalContext();
  console.log(download)


  return (
    <>
      {download.length != 0 ? (
          <ImageContainer allImages={download} />
        ) : (
          <div className="text-center  h-full flex flex-col  justify-center items-center gap-10">
            <p className=" text-2xl md:text-4xl">You don't have download image</p>
            <Link
              to={"/"}
              className="btn btn-sm md:btn-md btn-secondary">
              Back Home
            </Link>
          </div>
        )}
    </> 
    
  )
}

export default Download