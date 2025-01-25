import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/GifContext";
import FilterGif from "../components/filter-gif";
import Gif from "../components/Gif";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);

  const { gf, filter } = GifState();
  const { query } = useParams();

  const fetchSearchResult = async () => {
    try {
      const { data } = await gf.search(query, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 50,
      });

      setSearchResult(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResult([]); // Clear results on error.
    }
  };

  useEffect(() => {
    fetchSearchResult();
  }, [filter, query]);

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>

      <FilterGif alignLeft={true} />

      {searchResult.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResult.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for <strong>{query}</strong>. Try searching for Stickers
          instead?
        </span>
      )}
    </div>
  );
};

export default Search;
