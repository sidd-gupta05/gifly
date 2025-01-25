import { useState, useEffect } from "react"; // Importing useState and useEffect from React
import { Link } from "react-router-dom"; // Importing Link for navigation
import { HiDotsVertical } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import { GifState } from "../context/GifContext";
import category from "../pages/category";
import GifSearch from "./gif-search";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gf, favorites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex flex-row items-center space-x-2 group">
          <div className="flex flex-row items-center space-x-2 group-hover:drop-shadow-[0_0_15px_#9b2d91] group-hover:drop-shadow-[0_0_30px_#9b2d91] transition-all duration-300 ease-in-out">
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb29vZm5oOTI5azIyeW5ydzFxYWZzem4zMXQwMnQ0dDNwMHFicWF1NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/54Ya3l8S8y1ggAlzTA/giphy.gif"
              alt="Gifly Logo"
              className="h-15 w-20 transition-all duration-300 ease-in-out transform group-hover:scale-110"
            />
            <h1 className="text-4xl font-bold text-white tracking-tight cursor-pointer group-hover:text-purple-600 transition-all duration-300 ease-in-out">
              Gifly
            </h1>
          </div>
        </Link>

        <div className="font-bold text-md flex gap-2 items-center">
          {categories?.slice(0, 5)?.map((category) => (
            <Link
              key={category.name}
              to={`/${category.name_encoded}`}
              className="px-4 py-1 hidden lg:block"
            >
              <button className="cursor-pointer bg-gradient-to-b hover:bg-gradient-to-b hover:from-purple-400 hover:to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
                <div className="relative overflow-hidden">
                  {/* Apply rotation on hover */}
                  <p >
                    {category.name}
                  </p>
                </div>
              </button>
            </Link>
          ))}

          {/* This button will be visible on smaller screens */}
          <button onClick={() => setShowCategories(!showCategories)} className="lg:hidden">
            <HiMenuAlt3 size={35} className="py-0.5" />
          </button>

          {favorites.length > 0 && (
            <Link to="/favourite" className="px-4 py-1">
              <button className="cursor-pointer bg-gradient-to-b from-pink-500 to-red-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
                <div className="relative overflow-hidden">
                  {/* Apply rotation on hover */}
                  <p className="group-hover:scale-100 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    Favorites
                  </p>
                </div>
              </button>
            </Link>
          )}

          {/* This button will be visible on larger screens */}
          <button onClick={() => setShowCategories(!showCategories)} className="hidden lg:block">
            <HiDotsVertical size={35} className="py-0.5" />
          </button>
        </div>

        {showCategories && (
          <div className="absolute right-0 top-20 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5"/>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((category) => (
                <Link 
                  key={category.name}
                  className="font-bold"
                  to={`/${category.name_encoded}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <GifSearch/>
    </nav>
  );
};

export default Header;
