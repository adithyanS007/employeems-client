import React from "react";
import Typewriter from "react-typewriter-effect";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate("/login");
    };

    const handleEmployeeLogin = () => {
        navigate("/login");
    };
    return (
        <div className="mt-0 text-white h-screen flex flex-col justify-center items-center bg-[#000300]">
            <div className="max-w-[800px] mt-[-96px] w-full h-screen max-auto text-center flex flex-col justify-center">
                <p className="text-[#00df9a] font-bold p-2">WELCOME TO EMPLOYEE MANAGEMENT SYSTEM</p>
                <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">Grow with ePulse</h1>

                <div className="flex justify-center items-center md:text-4xl sm:text-3xl text-xl font-bold md:pl-4 py-4">
                    <p>Flexible to manage employees </p>
                    <Typewriter
                        startDelay={200}
                        cursorColor="white"
                        textStyle={{ paddingLeft: "0.5rem" }}
                        multiText={["Work", "Log", "Leave", "Attendence"]} // This is the correct prop for the text strings
                        typeSpeed={120}
                        backSpeed={140}
                        multiTextLoop={true}
                    />
                </div>
                <p className="md:text-2xl text-xl font-bold text-gray-500">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente laborum consectetur adipisicing elit.
                    Sapiente laborum
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={handleAdminLogin}
                        className="bg-[#00df9a] w-[150px] rounded-md font-medium my-6 mx-4 py-3 text-black"
                    >
                        Admin
                    </button>
                    <button
                        onClick={handleEmployeeLogin}
                        className="bg-[#00df9a] w-[150px] rounded-md font-medium my-6 py-3 text-black"
                    >
                        Employee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
