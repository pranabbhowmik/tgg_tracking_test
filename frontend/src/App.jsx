import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Applayout from "./components/layout/Applayout";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { Toaster } from "react-hot-toast";
import ShortestPathFinder from "./components/ShortestPathFinder";
import PathRoutingPage from "./page/PathRouthing";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => !!localStorage.getItem("token")
    );

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Applayout
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                />
            ),
            // errorElement: <Error />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/login",
                    element: <Login setIsLoggedIn={setIsLoggedIn} />,
                },
                {
                    path: "/signup",
                    element: <Signup setIsLoggedIn={setIsLoggedIn} />,
                },
                {
                    path: "/map-route-finder",
                    element: <ShortestPathFinder />,
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
