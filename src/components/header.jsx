import { useState } from "react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex flex-row items-center space-x-2 group">
          {" "}
          {/* Added 'group' for hover effect */}
          {/* Container for image and text */}
          <div className="flex flex-row items-center space-x-2 group-hover:drop-shadow-[0_0_15px_#9b2d91] group-hover:drop-shadow-[0_0_30px_#9b2d91] transition-all duration-300 ease-in-out">
            {/* Logo Image */}
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb29vZm5oOTI5azIyeW5ydzFxYWZzem4zMXQwMnQ0dDNwMHFicWF1NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/54Ya3l8S8y1ggAlzTA/giphy.gif"
              alt="Gifly Logo"
              className="h-15 w-20 transition-all duration-300 ease-in-out transform group-hover:scale-110"
            />
            {/* Logo Text */}
            <h1 className="text-4xl font-bold text-white tracking-tight cursor-pointer group-hover:text-purple-600 transition-all duration-300 ease-in-out">
              Gifly
            </h1>
          </div>
        </Link>

        <div className="font-bold text-md flex gap-2 items-center">

        {/* Reaction Link */}
        <Link className="px-4 py-1  hidden lg:block">
          <button class="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
            <div class="relative overflow-hidden">
              <p class="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Reaction
              </p>
              <p class="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Reaction
              </p>
            </div>
          </button>
        </Link>

        <button onClick={() => setShowCategories(!showCategories)}>
        <HiDotsVertical 
        size = {35}
        className={`py-0.5 lg:block`}
        />
        </button>
        <Link to="/favourite" className="px-4 py-1">
          <button class="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group">
            <div class="relative overflow-hidden">
              <p class="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Favorite Gifs
              </p>
              <p class="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] text-red-300">
                I loved it
              </p>
            </div>
          </button>
        </Link>

        <button>
        <HiMenuAlt3 
        size ={30}
        className="text-sky-400 lg:hidden"
        />
        </button>
        </div>

      {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
        <span>categories</span>
        <hr />
        <div>
            <Link className="font-bold">Reaction</Link>
        </div>
        </div>
        )}
        </div>
    </nav>
  );
};

export default Header;
