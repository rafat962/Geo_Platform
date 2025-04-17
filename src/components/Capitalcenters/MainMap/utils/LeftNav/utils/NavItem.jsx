import React from "react";
import { Tooltip } from "@mui/material";
import $ from "jquery";
import { BiWindowClose } from "react-icons/bi";
const NavItem = ({
    name,
    icon,
    onClick,
    state,
    content,
    dispatch,
    dir = "left",
    Vdir = "ver",
    smallCase = false,
}) => {
    console.log(smallCase);
    if (state)
        $(
            `#${smallCase ? name.split(" ").join("") + "SM" : name.split(" ").join("")}`
        ).slideDown(400);
    if (!state)
        $(
            `#${smallCase ? name.split(" ").join("") + "SM" : name.split(" ").join("")}`
        ).slideUp(400);
    return (
        <>
            <Tooltip title={name} placement="right" arrow>
                <li
                    onClick={onClick}
                    className={`${state && "bg-black  text-white"} flex justify-center items-center text-xl w-full py-4 px-3 cursor-pointer text-gray-400 hover:text-white hover:bg-black  hover:backdrop-opacity-40 trans`}
                >
                    {icon}
                </li>
            </Tooltip>
            {/* Items Content */}
            <div
                id={
                    smallCase
                        ? name.split(" ").join("") + "SM"
                        : name.split(" ").join("")
                }
                className={`hidden ${dir == "left" || smallCase ? "left-[3rem]" : "right-[3rem]"}  absolute z-50 ${Vdir === "ver" ? "h-full w-72  top-0" : " w-[calc(100%-6rem)] h-[35rem] bottom-0"}  bg-white z-10 text-black overflow-hidden pb-8`}
            >
                {/* header */}
                <div className="w-full bg-white p-3 border-b-2 border-b-gray-200 flex items-center justify-between">
                    <h1 className="font-sec">{name}</h1>
                    <BiWindowClose
                        onClick={() => dispatch({ type: "reset" })}
                        className=" text-xl cursor-pointer hover:text-red-500 trans"
                    />
                </div>
                {/* container */}
                <div className="flex flex-col w-full h-full items-center justify-start overflow-hidden">
                    {/* layersContent */}
                    {content}
                </div>
            </div>
        </>
    );
};

export default NavItem;
