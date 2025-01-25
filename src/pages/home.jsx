import { useState, useEffect } from "react"; 
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";  
import FilterGif from "../components/filter-gif";

const Home = () => { 
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendingGIFS = async () => {
    const { data } = await gf.trending({
      limit: 50,
      type: filter,
      rating: "g",
    });

    setGifs(data);
  };

  useEffect(() => {
    fetchTrendingGIFS();
  }, [filter]);

  return (
    <div>
      {/* Banner Image */}
      {/* You can uncomment this image if you want to use a banner */}
      {/* { <img
        src=""
        alt="Banner"
        className="mt-2 rounded w-full h-21"  
      /> } */}

      <FilterGif showTrending />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => (
          <Gif key={gif.title} gif={gif} />  
        ))}
      </div>
    </div>
  );
};

export default Home;
