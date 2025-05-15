import React from "react";
import { Tooltip } from "@mui/material";
import $ from "jquery";
import { BiWindowClose } from "react-icons/bi";
import { useNavContext } from "../../../context/NavContext";
const NavItem = ({
    name,
    icon,
    onClick,
    state: isOpen,
    content,
    dispatch,
    dir = "left",
    Vdir = "ver",
    smallCase = false,
    disable = false,
}) => {
    if (isOpen)
        $(
            `#${smallCase ? name.split(" ").join("") + "SM" : name.split(" ").join("")}`
        ).slideDown(400);
    if (!isOpen)
        $(
            `#${smallCase ? name.split(" ").join("") + "SM" : name.split(" ").join("")}`
        ).slideUp(400);
    const { state } = useNavContext();
    const { selectedLayer } = state;
    return (
        <>
            <Tooltip title={name} placement="right" arrow>
                <li
                    onClick={onClick}
                    className={`${isOpen && "bg-black  text-white"} ${disable ? "bg-black text-gray-500" : "hover:text-white hover:bg-black  hover:backdrop-opacity-40"} flex justify-center items-center text-xl w-full py-4 px-3 cursor-pointer text-gray-400  trans`}
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
                    <h1 className="font-sec">
                        {name} {selectedLayer && `(${selectedLayer?.title})`}
                    </h1>
                    <BiWindowClose
                        onClick={() => dispatch({ type: "reset" })}
                        className=" text-xl cursor-pointer hover:text-red-500 trans"
                    />
                </div>
                {/* container */}
                <div className="flex flex-col w-full h-full items-center justify-start overflow-hidden pb-16">
                    {/* layersContent */}
                    {content}
                </div>
            </div>
        </>
    );
};

export default NavItem;
