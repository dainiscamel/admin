import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Main from "@/pages/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
]);
