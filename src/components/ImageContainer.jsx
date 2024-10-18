import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Image from "./Image";
import { useGlobalContext } from "../hooks/useGlobalContext";

const ImageContainer = ({ allImages }) => {
  const { likedImages } = useGlobalContext();
  return (
    <div>
      <div>
        {
          <ResponsiveMasonry
            className="my-5"
            columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
          >
            <Masonry gutter="15px">
              {allImages.map((image) => (
                <Image
                  key={image.id}
                  image={image}
                  add={likedImages?.liked.some((v) => v.id == image.id)}
                  click={likedImages?.download.some((v) => v.id == image.id)}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        }
      </div>
    </div>
  );
};

export default ImageContainer;
