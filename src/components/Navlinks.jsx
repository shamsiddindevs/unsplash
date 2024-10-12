import React from "react";
import { Link } from "react-router-dom";

const Navlinks = () => {
  const links = [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/about",
      text: "About",
    },
    {
      path: "/contact",
      text: "Contact",
    },
  ];

  return (
    <>
      {links.map((link) => (
        <li key={link.path}>
          <Link to={link.path}>{link.text}</Link>
        </li>
      ))}
    </>
  );
};

export default Navlinks;
