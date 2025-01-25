import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       { 
//         path: "/", 
//         element: (
//           <>
//             <Header />
//             <Home />
//           </>
//         ),
//       },
//       { 
//         path: "/category/:category", 
//         element: (
//           <>
//             <Header />
//             <Category />
//           </>
//         ),
//       },
//       { 
//         path: "/search/:query", 
//         element: (
//           <>
//             <Header />
//             <Search />
//           </>
//         ),
//       },
//       { 
//         path: "/gif/:slug", 
//         element: (
//           <>
//             <Header />
//             <Findgif />
//           </>
//         ),
//       },
//       { 
//         path: "/favorites", 
//         element: (
//           <>
//             <Header />
//             <Favorite />
//           </>
//         ),
//       },
//     ],
//   },
// ]);