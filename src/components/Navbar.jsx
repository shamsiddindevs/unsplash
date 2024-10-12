import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcLandscape, FcLike, FcLikePlaceholder } from "react-icons/fc";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Navlinks from "./Navlinks";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { IoMdDownload } from "react-icons/io";

const Navbar = () => {
  const fromLocal = () => {
    return localStorage.getItem("theme") || "winter";
  };

  const {
    likedImages: { liked, download },
  } = useGlobalContext();

  const [theme, setTheme] = useState(fromLocal());

  const handleToggle = () => {
    let newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="align-center w-full bg-base-100">
      <div className="navbar items-center">
        <div className="navbar-start">
          <Link
            to={"/"}
            className="click_nobg hidden items-center gap-3 md:flex"
          >
            <FcLandscape className="h-10 w-10" />
            <p className="text-2xl font-bold">SuRaT</p>
          </Link>
          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button">
              <div className="click_nobg flex cursor-pointer items-center gap-3">
                <FcLandscape className="h-7 w-7" />
                <p className="text-xl font-bold">SuRaT</p>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <Navlinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden md:block">
          {" "}
          <ul className="menu menu-horizontal rounded-box">
            <Navlinks />
          </ul>
        </div>
        <div className="navbar-end flex">
          <Link className="click_nobg" to={"download"}>
            <label className="indicator">
              <IoMdDownload className="h-5 w-5 fill-current" />
              <span className="badge indicator-item badge-sm">
                {download.length}
              </span>
            </label>
          </Link>
          <Link className="click_nobg" to={"likedimg"}>
            <label className="indicator">
              {/* this hidden checkbox controls the state */}
              {/* <input type="checkbox" /> */}

              {/* no-click like icon */}
              {/* <FcLike className="swap-on h-5 w-5 fill-current " /> */}

              {/* liked icon */}
              <FcLikePlaceholder className="swap-off h-5 w-5 fill-current" />
              {/* indicator */}
              <span className="badge indicator-item badge-sm">
                {liked.length}
              </span>
            </label>
          </Link>
          <div className="click_nobg">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                onClick={handleToggle}
                defaultChecked={theme !== "winter"}
              />

              {/* sun icon */}
              <IoMdSunny className="swap-off h-5 w-5 fill-current" />

              {/* moon icon */}
              <IoMdMoon className="swap-on h-5 w-5 fill-current" />
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
