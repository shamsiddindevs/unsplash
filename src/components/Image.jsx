import React from "react";
import {FaDownload, FaHeart} from "react-icons/fa";
import {IoMdDownload} from "react-icons/io";
import {FaCircleCheck} from "react-icons/fa6";
import {MdDelete} from "react-icons/md";

import {useGlobalContext} from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";

const Image = ({image, add,click}) => {
  const {id, urls, links, user, alt, hasImg} = image;
  const {likedImages, dispatch} = useGlobalContext();
  console.log(add);

  //   add global context images
  function addLikedImages(img,e) {
    e.preventDefault()
    let alreadyAddImage = likedImages?.liked.some((v) => v.id == img.id);
    if (!alreadyAddImage) {
      dispatch({type: "LIKE", payload: img});
    } else {
      dispatch({type: "UNLIKE", payload: img.id});
    }
  }
// add Download
  function addDownloadImages(img,e) {
    e.preventDefault()
    let alreadyAddImage = likedImages?.download.some((v) => v.id == img.id);
    if (!alreadyAddImage) {
      window.open(links?.download + "&force=true","_blank")
      dispatch({type: "DOWNLOAD", payload: img});
    } else {
      dispatch({type: "DELETE", payload: img.id});
    }
      
  }



  return (
    <div className="relative group">
      <img
        key={id}
        className="rounded-lg"
        src={urls.regular}
        style={{width: "100%", display: "block"}}
      />
      <Link to={`imageinfo/${image.id}`} className="absolute invisible opacity-0  cursor-zoom-in group-hover:visible group-hover:opacity-100 transition-all duration-300 w-full h-full  top-0 left-0 bg-black/[.2] z-10 rounded-lg">
        {/* heart */}
        {!add && (
          <span
            className="image-hover top-3 right-2"
            onClick={(e) => addLikedImages(image,e)}>
            <FaHeart className=" text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" />
          </span>
        )}
        {add && (
          <span
            className="image-hover top-3 right-2"
            onClick={(e) => addLikedImages(image,e)}>
            <FaHeart className=" text-red-700  text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" />
          </span>
        )}
        {/* download */}
       {!click && <span
          
          download
          rel="nofollow"
          
          className="image-hover bottom-3 right-2"
          onClick={ (e) => addDownloadImages(image,e)}

          >
          <IoMdDownload className=" text-sm absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" />
        </span>
        }{
          click&& <span
          className="image-hover bottom-3 right-2"
          onClick={(e) => addDownloadImages(image,e)}>
          <MdDelete className=" text-red-700  text-xs absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" />
        </span>
        }

        {/* User
         */}
        <div className="flex items-center gap-2 absolute bottom-3 left-2">
          <span className="overflow-hidden  w-5 h-5  md:w-7 md:h-7 rounded-full cursor-pointer transition-all">
            <img
              src={user.profile_image.small}
              alt="user"
              className="w-full h-full object-cover"
            />
          </span>
          <div className=" flex w-4/5  flex-col text-white font-medium ">
            <h4 className=" text-xs md:text-sm text-hover">{user.name}</h4>
            <div className=" text-xs hidden md:flex items-center gap-2 text-hover ">
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
