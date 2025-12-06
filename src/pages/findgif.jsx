import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/GifContext";
import Gif from "../components/Gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
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
    const url = gif.url || window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: gif.title,
          text: shareText,
          url: url,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        shareText + " " + url
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const embedGif = () => {
    const gifUrl = gif.url || window.location.href;
    navigator.clipboard
      .writeText(gifUrl)
      .then(() => {
        alert("GIF URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
        alert("Failed to copy the URL.");
      });
  };

  const downloadGif = async () => {
    try {
      const gifUrl = gif.images?.original?.url;

      if (!gifUrl) {
        alert("No GIF URL available for download");
        return;
      }

      // Fetch the GIF as a blob
      const response = await fetch(gifUrl);
      if (!response.ok) throw new Error("Failed to fetch GIF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create download link
      const filename = `${
        gif.title?.replace(/[^a-zA-Z0-9]/g, "_") || "giphy_gif"
      }.gif`;
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);

      // Fallback method
      const fallbackLink = document.createElement("a");
      fallbackLink.href = gif.images?.original?.url;
      fallbackLink.download = `${gif.title || "giphy_gif"}.gif`;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    }
  };

  const fetchGif = async () => {
    const gifId = slug.substring(slug.lastIndexOf("-") + 1);
    const { data } = await gf.gif(gifId);
    const { data: related } = await gf.related(gifId, { limit: 30 });

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
                className="h-14 rounded-full"
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
                  className="flex items-center fadded-text cursor-pointer mt-2"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
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
          <div className="mt-4">
            <span className="fadded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a
                href={gif.source}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate hover:underline"
              >
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6 flex-col sm:flex-row">
          <div className="w-full sm:w-3/4">
            <div className="fadded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            <div className="flex sm:hidden gap-1 items-center mt-4">
              {gif?.user && (
                <>
                  <img
                    src={gif?.user?.avatar_url}
                    alt={gif?.user?.display_name}
                    className="h-14 rounded-full"
                  />
                  <div className="px-2">
                    <div className="font-bold">{gif?.user?.display_name}</div>
                    <div className="fadded-text">@{gif?.user?.username}</div>
                  </div>
                </>
              )}
              <button
                onClick={shareGif}
                className="ml-auto p-2 hover:bg-gray-100 rounded-full"
              >
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6 sm:mt-0">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg transition-all duration-300 hover:text-red-500"
            >
              <HiMiniHeart
                size={30}
                className={favorites.includes(gif.id) ? "text-red-500" : ""}
              />
              Favorite
            </button>

            <button
              onClick={shareGif}
              className="flex gap-6 items-center font-bold text-lg hover:text-blue-500 transition-all duration-300"
            >
              <FaPaperPlane size={25} />
              Share
            </button>

            <button
              onClick={embedGif}
              className="flex gap-5 items-center font-bold text-lg hover:text-green-500 transition-all duration-300"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>

            <button
              onClick={downloadGif}
              className="flex gap-5 items-center font-bold text-lg hover:text-purple-500 transition-all duration-300"
            >
              <FiDownload size={30} />
              Download
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-bold text-xl mb-4">Related GIFs</h2>
          <div className="columns-2 md:columns-3 gap-4">
            {relatedGifs.slice(1).map((relatedGif) => (
              <Gif key={relatedGif.id} gif={relatedGif} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Findgif;
