import React from "react";
import { FaDownload, FaHeart } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";

const Image = ({ image, add, click }) => {
  const { id, urls, links, user, alt, hasImg } = image;
  const { likedImages, dispatch } = useGlobalContext();
  console.log(add);

  //   add global context images
  function addLikedImages(img, e) {
    e.preventDefault();
    let alreadyAddImage = likedImages?.liked.some((v) => v.id == img.id);
    if (!alreadyAddImage) {
      dispatch({ type: "LIKE", payload: img });
    } else {
      dispatch({ type: "UNLIKE", payload: img.id });
    }
  }
  // add Download
  function addDownloadImages(img, e) {
    e.preventDefault();
    let alreadyAddImage = likedImages?.download.some((v) => v.id == img.id);
    if (!alreadyAddImage) {
      window.open(links?.download + "&force=true", "_blank");
      dispatch({ type: "DOWNLOAD", payload: img });
    } else {
      dispatch({ type: "DELETE", payload: img.id });
    }
  }

  return (
    <div className="group relative">
      <img
        key={id}
        className="rounded-lg"
        src={urls.regular}
        style={{ width: "100%", display: "block" }}
      />
      <Link
        to={`imageinfo/${image.id}`}
        className="invisible absolute left-0 top-0 z-10 h-full w-full cursor-zoom-in rounded-lg bg-black/[.2] opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100"
      > 
        {/* heart */}
        {!add && (
          <span
            className="image-hover right-2 top-3"
            onClick={(e) => addLikedImages(image, e)}
          >
            <FaHeart className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-xs" />
          </span>
        )}
        {add && (
          <span
            className="image-hover right-2 top-3"
            onClick={(e) => addLikedImages(image, e)}
          >
            <FaHeart className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-xs text-red-700" />
          </span>
        )}
        {/* download */}
        {!click && (
          <span
            download
            rel="nofollow"
            className="image-hover bottom-3 right-2"
            onClick={(e) => addDownloadImages(image, e)}
          >
            <IoMdDownload className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-sm" />
          </span>
        )}
        {click && (
          <span
            className="image-hover bottom-3 right-2"
            onClick={(e) => addDownloadImages(image, e)}
          >
            <MdDelete className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-xs text-red-700" />
          </span>
        )}

        {/* User
         */}
        <div className="absolute bottom-3 left-2 flex items-center gap-2">
          <span className="h-5 w-5 cursor-pointer overflow-hidden rounded-full transition-all md:h-7 md:w-7">
            <img
              src={user.profile_image.small}
              alt="user"
              className="h-full w-full object-cover"
            />
          </span>
          <div className="flex w-4/5 flex-col font-medium text-white">
            <h4 className="text-hover text-xs md:text-sm">{user.name}</h4>
            <div className="text-hover hidden items-center gap-2 text-xs md:flex">
              <h5>{user.for_hire && `Available for hire`}</h5>{" "}
              {user.for_hire && <FaCircleCheck />}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Image;
