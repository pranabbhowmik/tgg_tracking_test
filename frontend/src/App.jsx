import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Applayout from "./components/layout/Applayout";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
