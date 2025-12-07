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
import {
  FaWhatsapp,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaLink,
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const contentType = ["gifs", "stickers", "texts"];

const Findgif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const { gf, addToFavorites, favorites } = GifState();

  // Generate shareable website URL for this GIF
  const getGifWebsiteUrl = () => {
    const websiteBaseUrl = window.location.origin;
    return `${websiteBaseUrl}/gifs/${slug}`;
  };

  // Native Web Share API (for mobile devices)
  const shareViaNativeShare = () => {
    const websiteUrl = getGifWebsiteUrl();
    const message = `Check out this awesome GIF: ${gif.title || "Amazing GIF"}`;

    if (navigator.share) {
      navigator
        .share({
          title: `${gif.title || "GIF"} - Your Site Name`,
          text: message,
          url: websiteUrl,
        })
        .catch((error) => {
          console.log("Share cancelled:", error);
          setShowShareModal(true); // Fallback to custom modal
        });
    } else {
      setShowShareModal(true); // Desktop fallback
    }
  };

  // Platform-specific sharing functions
  const shareToPlatform = (platform) => {
    const websiteUrl = getGifWebsiteUrl();
    const message = `Check out this awesome GIF: ${gif.title || "Amazing GIF"}`;
    const encodedMessage = encodeURIComponent(`${message}\n${websiteUrl}`);
    const encodedUrl = encodeURIComponent(websiteUrl);

    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedMessage}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(
          message
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "instagram":
        // Instagram doesn't support direct web sharing, show instructions
        alert(
          "To share on Instagram:\n1. Save the GIF using the download button\n2. Upload it as a Story or Post\n3. Mention our website in your caption!"
        );
        return;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(
          message
        )}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(
          message
        )}`;
        break;
      case "pinterest":
        const imageUrl = encodeURIComponent(gif.images?.original?.url || "");
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${imageUrl}&description=${encodeURIComponent(
          message
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    const websiteUrl = getGifWebsiteUrl();
    navigator.clipboard
      .writeText(websiteUrl)
      .then(() => {
        alert("Website link copied to clipboard!");
        setShowShareModal(false);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = websiteUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Website link copied to clipboard!");
        setShowShareModal(false);
      });
  };

  const embedGif = () => {
    copyLinkToClipboard();
  };

  const downloadGif = async () => {
    try {
      const gifUrl = gif.images?.original?.url;

      if (!gifUrl) {
        alert("No GIF URL available for download");
        return;
      }

      const response = await fetch(gifUrl);
      if (!response.ok) throw new Error("Failed to fetch GIF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const filename = `${
        gif.title?.replace(/[^a-zA-Z0-9]/g, "_") || "giphy_gif"
      }.gif`;
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);

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

  // Dynamic page title for better sharing preview
  useEffect(() => {
    if (gif.title) {
      document.title = `${gif.title} - Your Site Name`;
    }

    // Add Open Graph meta tags for better social sharing
    const metaTags = [
      {
        property: "og:title",
        content: `${gif.title || "Awesome GIF"} - Your Site Name`,
      },
      {
        property: "og:description",
        content: gif.user?.description || "Check out this amazing GIF",
      },
      { property: "og:image", content: gif.images?.original?.url },
      { property: "og:url", content: getGifWebsiteUrl() },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ];

    metaTags.forEach(({ property, name, content }) => {
      let meta = document.querySelector(
        `meta[${property ? `property="${property}"` : `name="${name}"`}]`
      );
      if (!meta) {
        meta = document.createElement("meta");
        if (property) meta.setAttribute("property", property);
        if (name) meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });

    return () => {
      document.title = "Your Site Name";
    };
  }, [gif]);

  // Share Modal Component
  const ShareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-b">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-black">Share GIF</h3>
          <button
            onClick={() => setShowShareModal(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Share this GIF on your favorite platforms:
        </p>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* WhatsApp */}
          <button
            onClick={() => shareToPlatform("whatsapp")}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-green-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2">
              <FaWhatsapp size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">WhatsApp</span>
          </button>

          {/* Twitter */}
          <button
            onClick={() => shareToPlatform("twitter")}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center mb-2">
              <FaTwitter size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">Twitter</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => shareToPlatform("facebook")}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-2">
              <FaFacebookF size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">Facebook</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => shareToPlatform("linkedin")}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center mb-2">
              <FaLinkedinIn size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">LinkedIn</span>
          </button>

          {/* Instagram */}
          <button
            onClick={() => shareToPlatform("instagram")}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-pink-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-2">
              <RiInstagramFill size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">Instagram</span>
          </button>

          {/* Reddit */}
          <button
            onClick={() => shareToPlatform("reddit")}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-2">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Reddit</span>
          </button>

          {/* Telegram */}
          <button
            onClick={() => shareToPlatform("telegram")}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
              <span className="text-white font-bold text-lg">TG</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Telegram</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={copyLinkToClipboard}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mb-2">
              <FaLink size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">Copy Link</span>
          </button>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Your website link:</p>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={getGifWebsiteUrl()}
              className="flex-1 p-2 border rounded-l text-sm truncate bg-white text-gray-600"
            />
            <button
              onClick={copyLinkToClipboard}
              className="bg-gray-500 text-white px-4 py-2 rounded-r hover:bg-gray-600"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showShareModal && <ShareModal />}

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
                  onClick={shareViaNativeShare}
                  className="ml-auto p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  title="Share GIF"
                >
                  <FaPaperPlane size={20} />
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
                onClick={shareViaNativeShare}
                className="flex gap-6 items-center font-bold text-lg hover:text-blue-500 transition-all duration-300"
                title="Share GIF on social media"
              >
                <FaPaperPlane size={25} />
                Share
              </button>

              <button
                onClick={copyLinkToClipboard}
                className="flex gap-5 items-center font-bold text-lg hover:text-green-500 transition-all duration-300"
                title="Copy Website Link"
              >
                <IoCodeSharp size={30} />
                Copy Link
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
    </>
  );
};

export default Findgif;
