import React from "react";
import Navbar from "../pages/navbar.jsx";
import HomePage from "../pages/homePage.jsx";
import About from "../pages/about.jsx";

const Home = () => (
    <div className="mt-24">
        <Navbar />
        <HomePage />
        <About />
    </div>
);

export default Home;
