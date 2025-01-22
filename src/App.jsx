import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home";
import Category from "./pages/category";
import Findgif from "./pages/findgif";
import Search from "./pages/search";
import Favorite from "./pages/favorite";

import AppLayout from "./layout/AppLayout";

import Header from "./components/header";
import './App.css'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <>
          <Header />
          <Home />
        </> 
      },
      { path: "/:category", element: <>
          <Header />
          <Category />
        </> 
      },
      { path: "/:search/:query", element: <>
          <Header />
          <Search />
        </> 
      },
      { path: "/:type/:slug", element: <>
          <Header />
          <Findgif />
        </> 
      },
      { path: "/favorites", element: <>
          <Header />
          <Favorite />
        </> 
      },
    ],
  },
]);

function App() {
  
  return <RouterProvider router={router} />;
}

export default App
