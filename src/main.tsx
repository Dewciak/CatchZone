import {createRoot} from "react-dom/client";
import "./index.css";
import Homepage from "./pages/Homepage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PokemonDetailPage from "./pages/PokemonDetailPage.tsx";
import {PokemonProvider} from "./components/PokemonContext.tsx";

const router = createBrowserRouter([
  {path: "/", element: <Homepage />},
  {path: "*", element: <NotFoundPage />},
  {path: "/pokemon/:pokemonName", element: <PokemonDetailPage />},
]);

createRoot(document.getElementById("root")!).render(
  <PokemonProvider>
    <RouterProvider router={router} />
  </PokemonProvider>
);
