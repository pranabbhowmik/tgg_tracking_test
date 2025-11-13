import React from "react";
import logo from "../../assets/logo.png";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Applayout({ isLoggedIn, setIsLoggedIn }) {
    const items = [
        {
            label: "About",
            bgColor: "#0D0716",
            textColor: "#fff",
            links: [
                { label: "About Us", ariaLabel: "About Us" },
                { label: "Food & Supply", ariaLabel: "Food & Supply" },
                { label: "Notification", ariaLabel: "Notification" },
                { label: "Goverment Login", ariaLabel: "Goverment Login" },
            ],
        },
        {
            label: "Projects",
            bgColor: "#170D27",
            textColor: "#fff",
            links: [
                { label: "Featured", ariaLabel: "Featured Projects" },
                { label: "Case Studies", ariaLabel: "Project Case Studies" },
                { label: "FAQ", ariaLabel: "faq" },
            ],
        },
        {
            label: "Contact",
            bgColor: "#271E37",
            textColor: "#fff",
            links: [
                { label: "Email", ariaLabel: "Email us" },
                { label: "Twitter", ariaLabel: "Twitter" },
                { label: "LinkedIn", ariaLabel: "LinkedIn" },
            ],
        },
    ];
    return (
        <>
            <Navbar
                logo={logo}
                logoAlt="WB Food and Supply Logo"
                items={items}
                baseColor="#fff"
                menuColor="#000"
                buttonBgColor="#111"
                buttonTextColor="#fff"
                ease="power3.out"
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />
            <main className="flex-grow pt-28 md:pt-36">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default Applayout;
