import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home";
import Category from "./pages/category";
import Findgif from "./pages/findgif";
import Search from "./pages/search";
import Favorite from "./pages/favorite";

import AppLayout from "./layout/AppLayout";

import Header from "./components/header";
import "./App.css";
import GifProvider from "./context/GifContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Header />
            <Home />
          </>
        ),
      },
      {
        path: "/favorite",
        element: (
          <>
            <Header />
            <Favorite />
          </>
        ),
      },
      {
        path: "/search/:query",
        element: (
          <>
            <Header />
            <Search />
          </>
        ),
      },
      {
        path: "/:type/:slug",
        element: (
          <>
            <Header />
            <Findgif />
          </>
        ),
      },
      {
        path: "/:category",
        element: (
          <>
            <Header />
            <Category />
          </>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
