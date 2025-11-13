import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Applayout from "./components/layout/Applayout";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { Toaster } from "react-hot-toast";
import PathRoutingPage from "./page/PathRouthing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      // errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/routhing",
          element: <PathRoutingPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
