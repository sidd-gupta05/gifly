import { useState, useEffect } from 'react';
import { GifState } from '../context/GifContext';
import Gif from '../components/Gif';

const Favorite = () => {
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);
  const { gf, favorites } = GifState();

  const fetchFavoriteGIFs = async () => {
    if (favorites.length === 0) return;

    // Fetch GIFs based on the list of favorite IDs
    const { data: gifs } = await gf.gifs(favorites.join(',')); // Assuming `favorites` is an array of GIF IDs
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, [favorites]); // Re-fetch when favorites change

  return (
    <div className="mt-2">
      <span className="fadded-text">My Favorites</span>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs.length > 0 ? (
          favoriteGIFs.map((gif) => <Gif key={gif.id} gif={gif} />)
        ) : (
          <p>No favorite GIFs added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
