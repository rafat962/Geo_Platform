import React from "react";
import { Tooltip } from "@mui/material";
import $ from "jquery";
import { BiWindowClose } from "react-icons/bi";
import MenuItem from "@mui/material/MenuItem";
const NavMenuItem = ({
    name,
    handleDispatch,
    handleClose,
    state,
    content,
    dispatch,
}) => {
    if (state) $(`#${name}`).slideDown(400);
    // if (!state) $(`#${name}`).slideUp(400);
    function handleMenu() {
        handleDispatch();
        handleClose();
    }
    return (
        <>
            <MenuItem onClick={handleMenu}>{name}</MenuItem>
            {/* Items Content */}
            <div
                id={name}
                className="hidden left-[3rem] top-0 absolute h-full w-72 bg-white z-10 text-black overflow-hidden pb-8"
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

export default NavMenuItem;
