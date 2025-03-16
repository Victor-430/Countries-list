import { createBrowserRouter } from "react-router-dom";

import { Home } from "../components/Home";
import { Navbar } from "../components/Navbar";
import { DetailPage } from "../pages/DetailPage";
import { PageNotFound } from "../pages/PageNotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "country/:id", element: <DetailPage /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);
