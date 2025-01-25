import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniHeart } from "react-icons/hi2";
import { GifState } from "../context/GifContext";

const Gif = ({ gif, hover = true }) => {
  const [loading, setLoading] = useState(true);
  const { favorites, addToFavorites } = GifState();

  // Array of random colors for loading placeholders
  const colors = ["bg-red-300", "bg-blue-300", "bg-yellow-300", "bg-green-300", "bg-purple-300"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Pick a random color

  const isFavorite = favorites.includes(gif.id);
  
  return (
    <Link to={`/${gif.type}s/${gif.slug}`}>
      <div className="w-full mb-2 relative cursor-pointer group aspect-video">
        {/* Loading Placeholder */}
        {loading && (
          <div
            className={`absolute inset-0 ${randomColor} rounded animate-pulse`}
          ></div>
        )}

        {/* GIF Image */}
        <img
          src={gif?.images?.fixed_width?.webp}
          alt={gif?.title || "GIF"}
          className={`w-full object-cover rounded transition-all duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)} // Hide loading placeholder when the image loads
        />

        {/* Hover Effect */}
        {hover && (
          <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent via-transparent to-black text-white font-bold flex items-end gap-2 p-2 transition-opacity duration-300">
            {gif?.user?.avatar_url && (
              <img
                src={gif.user.avatar_url}
                alt={gif.user.display_name || "User"}
                className="h-8 w-8 rounded-full"
              />
            )}
            <span>{gif?.user?.display_name || "Anonymous"}</span>
          </div>
        )}

        {/* Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation when clicking the heart button
            addToFavorites(gif.id);
          }}
          className={`absolute top-2 right-2 ${
            favorites.includes(gif.id) ? "text-red-500" : "text-gray-500"
          }`}
        >
          <HiMiniHeart size={30} />
        </button>
      </div>
    </Link>
  );
};

export default Gif;
