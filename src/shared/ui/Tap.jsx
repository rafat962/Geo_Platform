import React from "react";

const Tap = ({ bgColor, number, name, imgPath, textColor }) => {
    return (
        <div className="tap dark:bg-gray-800 bg-white ring shadow-xl  ring-gray-900/5">
            {/* Crooked squared*/}
            <div className="dIRect ">
                {/* bg */}
                <div
                    className={`absolute inset-0 ${bgColor} rounded-4xl opacity-60`}
                ></div>
                {/* img */}
                <div className="w-18 h-18 md:w-14 md:h-14 lg:w-18 lg:h-18 object-cover inset-7 md:inset-5 lg:inset-7 absolute -rotate-40 opacity-90">
                    <img src={imgPath} className="w-full h-full" alt={name} />
                </div>
            </div>
            <div className="flex flex-col items-end justify-center w-full h-full pr-4">
                <h1 className={`text-4xl font-bold ${textColor}`}>{number}</h1>
                <p className="text-lg md:text-xl  text-gray-500 dark:text-gray-200 font-semibold max-w-22 md:max-w-40 text-end text-wrap">
                    {name}
                </p>
            </div>
        </div>
    );
};

export default Tap;
