import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { useCollection } from "../hooks/useCollection";

export const GlobalContext = createContext();

const changeColor = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "REFRESH":
      return {
        ...state,
        refresh: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "LIKE":
      return { ...state, liked: payload };

    case "DOWNLOAD":
      return { ...state, download: payload };

    case "DELETE":
      return {
        ...state,
        download: state.download.filter((v) => v.id !== payload),
      };

    case "UNLIKE":
      return {
        ...state,
        liked: state.liked.filter((v) => v.id !== payload),
      };
    case "LOADING":
      return {
        ...state,
        loading:payload
      }

    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  //  console.log(likedImages)

  const [state, dispatch] = useReducer(changeColor, {
    user: null,
    refresh: false,
    download: [],
    liked: [],
    loading:false
  });
  // console.log(state.user);

  const { data: likedImages } = useCollection("images", [
    "uid",
    "==",
    state.user && state.user.uid,
  ]);
  
  const { data: downloadImages } = useCollection("download", [
    "uid",
    "==",
    state.user && state.user.uid,
  ]);


  useEffect(() => {
    localStorage.setItem("my-splash", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (likedImages) dispatch({ type: "LIKE", payload: likedImages });
    if (downloadImages) dispatch({ type: "DOWNLOAD", payload: downloadImages });
    
  }, [likedImages,downloadImages]);
  console.log(state)

  return (
    <GlobalContext.Provider value={{ likedImages: state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
