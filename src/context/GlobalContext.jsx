import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const dataFromJson = () => {
    return (
      JSON.parse(localStorage.getItem("my-splash")) ?? {
        download: [],
        liked: [],
      }
    );
  };

  const changeColor = (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case "LIKE":
        return { ...state, liked: [...state.liked, payload] };
        if (payload.hasImg) {
          if (state.liked?.some((v) => v.id == payload.id)) {
            toast.warn("You have already done !");
            return state;
          } else {
          }
        } else {
        }
      case "DOWNLOAD":
        return { ...state, download: [...state.download, payload] };

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

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(changeColor, dataFromJson());

  console.log(state);

  useEffect(() => {
    localStorage.setItem("my-splash", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ likedImages: state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
