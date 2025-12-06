import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import FollowOn from "../components/follow-on";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

const contentType = ["gifs", "stickers", "texts"];

const Findgif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gf, addToFavorites, favorites } = GifState();

  const shareGif = () => {
    const shareText = `Check out this amazing GIF: ${gif.title}`;
    const url = gif.url || window.location.href; // Use the GIF's URL or current page URL
    
    if (navigator.share) {
      // Web Share API (works on mobile and modern browsers)
      navigator.share({
        title: gif.title,
        text: shareText,
        url: url,
      }).catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers without Web Share API
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`;
      window.open(whatsappUrl, "_blank"); // Open WhatsApp
    }
  };

  const EmbedGif = () => {
    const gifUrl = gif.url || window.location.href;
    // Copy the URL to clipboard
    navigator.clipboard.writeText(gifUrl)
      .then(() => {
        alert("GIF URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
        alert("Failed to copy the URL.");
      });
  };

  const downloadGif = () => {
    const link = document.createElement("a");
    link.href = gif.images.original.url; // Use the original GIF URL for downloading
    link.download = `${gif.title || "download"}.gif`; // Default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchGif = async () => {
    const gifId = slug.substring(slug.lastIndexOf("-") + 1); // Extract GIF ID from slug.
    const { data } = await gf.gif(gifId); // Fetch GIF details.
    const { data: related } = await gf.related(gifId, { limit: 30 }); // Fetch related GIFs.

    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      console.error("Invalid Content Type");
      return;
    }
    fetchGif();
  }, [type, slug]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="fadded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}

                <div
                  className="flex items-center fadded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {!readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read More <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider"></div>
        {gif?.source && (
          <div className="">
            <span className="fadded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>


      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="fadded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="fadded-text">@{gif?.user?.username}</div>
              </div>

              <button
              onClick={shareGif}
              className="ml-auto"
              >
              <FaPaperPlane size={25} />
              </button>
            </div>
            </div>

            <div className="hidden sm:block flex flex-col gap-5 mt-10 sm:mt-0">
              <button
                onClick={() => addToFavorites(gif.id)}
                className="flex gap-5 items-center font-bold text-lg transition-all duration-300 "
              >
                <HiMiniHeart size={30}
                  className={ `${
                    favorites.includes(gif.id)
                      ? "text-red-500 hover:scale-110 "
                      : " "
                  }`}
                  />
                Favorites
              </button>

              <button
                onClick={shareGif} // Share functionality
                className="flex gap-6 items-center font-bold text-lg hover:text-blue-500  transition-all duration-300"
                >
                <FaPaperPlane size={25} />
                Share
              </button>

              <button
                onClick={EmbedGif} // Embed functionality (copies URL)
                className="flex gap-5 items-center font-bold text-lg hover:text-green-300  transition-all duration-300"
                >
                <IoCodeSharp size={30} />
                Embed
              </button>

              <button
                onClick={downloadGif} // Download functionality
                className="flex gap-5 items-center font-bold text-lg hover:text-purple-500 transition-all duration-300"
                >
                <FiDownload size={30} />
                Download
              </button>
            </div>
          </div>

          <div >
            <span className="font-extra-bold">Related Gifs</span>
            <div className="column-2 md:columns-3 gap-2">
              {relatedGifs.slice(1).map((gif) => (
                <Gif key={gif.id} gif={gif} />
              ))}
            </div>
          </div>
        </div>
              </div>
  );
};

export default Findgif;
