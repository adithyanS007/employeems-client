import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [nav, setnav] = useState(false);

    const handleNav = () => {
        setnav(!nav);
    };

    return (
      <div className=" fixed top-0 left-0 w-full z-50 bg-[#000300]">

        <div className="flex justify-between items-center h-24 max-w-[1240px] max-auto px-4 text-white ">
            <h1 className="w-full text-3xl font-bold text-[#00df9a] ml-8">ePulse.</h1>

            <ul className="hidden md:flex ml-15">
                <li className="p-4">
                    <Link to="/">Home</Link>
                </li>
                <li className="p-4">
                    <Link to="/">About</Link>
                </li>
            </ul>

            <div onClick={handleNav} className="block md:hidden">
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            <div
                className={
                    nav
                        ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
                        : "fixed left-[-100%]"
                }>
                <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4 ">ePulse.</h1>

                <ul className="uppercase p-4">
                    <li className="p-4 border-b border-gray-600">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="p-4">
                        <Link to="/">About</Link>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    );
};

export default Navbar;
