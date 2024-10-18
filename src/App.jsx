import React, { useEffect } from "react";
// leyauts
import HomeLayout from "./layouts/HomeLayout";
// pages
import {
  Home,
  About,
  Contact,
  LikedImg,
  Nopage,
  Download,
  ImageInfo,
  Login,
  Register,
} from "./pages";
// routers
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

// action
import { action as HomeAction, loader } from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { action as actionRegister } from "./pages/Register";
import { action as actionLogin } from "./pages/Login";
import { useGlobalContext } from "./hooks/useGlobalContext";
import { toast } from "react-toastify";

const App = () => {
  const {
    likedImages: { user, refresh },
    dispatch,
  } = useGlobalContext();
  const routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <HomeLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: HomeAction,
          loader: loader,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "download",
          element: <Download />,
        },
        {
          path: "likedimg",
          element: <LikedImg />,
        },
        {
          path: "imageinfo/:id",
          element: <ImageInfo />,
        },
        {
          path: "*",
          element: <Nopage />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to={"/"} /> : <Login />,
      action: actionLogin,
    },
    {
      path: "/register",
      element: user ? <Navigate to={"/"} /> : <Register />,
      action: actionRegister,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOGIN", payload: user });
      dispatch({ type: "REFRESH" });
    });
  }, []);

  return <>{refresh && <RouterProvider router={routers} />}</>;
};

export default App;
