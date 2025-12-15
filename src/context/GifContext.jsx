import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState, useEffect, useContext, createContext } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (id) => {
    let updatedFavorites;

    if (favorites.includes(id)) {
      // Remove from favorites
      updatedFavorites = favorites.filter((itemId) => itemId !== id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, id];
    }

    // Update state
    setFavorites(updatedFavorites);

    // Update localStorage
    localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
  };

  // Load favorites from localStorage on initial load
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
    setFavorites(storedFavorites);
  }, []);

  const gf = new GiphyFetch(import.meta.env.VITE_GIFLY_KEY);

  return (
    <GifContext.Provider value={{ gf, gifs, setGifs, filter, setFilter, favorites, addToFavorites }}>
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
