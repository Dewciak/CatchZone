import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import Homepage from "./Homepage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    loader: async ({params}) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    },
  },
  {path: "*", element: <NotFoundPage />},
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
