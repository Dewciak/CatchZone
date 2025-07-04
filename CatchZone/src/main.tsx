import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index: true, element: <Homepage />},
      {path: "pokemon/:pokemonName", element: <PokemonDetailPage />},
    ],
  },
  {path: "*", element: <NotFoundPage />},
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
