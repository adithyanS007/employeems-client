import React from "react";

const SummaryCard = ({ icon, text, number, gradient }) => {
    return (
        <div className="rounded bg-white w-48 h-48 flex flex-col items-center justify-center shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div
                className={`flex justify-center items-center ${gradient} text-white p-4 w-full h-1/2 transition-all duration-300`}
            >
                <div className="text-5xl">{icon}</div>
            </div>
            <div className="flex flex-col items-center justify-center h-1/2">
                <p className="text-lg font-semibold">{text}</p>
                <p className="text-xl font-bold">{number}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
