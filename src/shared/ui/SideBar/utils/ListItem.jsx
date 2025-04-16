import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { NavLink } from "react-router-dom";

const ListItem = ({ name, icon, openNav, toUrl, target = "_self" }) => {
    return (
        <NavLink
            target={target}
            to={toUrl}
            className={({ isActive }) =>
                `flex items-center justify-end p-2 px-3 rounded-xl space-x-4 cursor-pointer w-full trans 
                dark:hover:bg-gray-700 hover:bg-gray-100 
                ${isActive ? "bg-gray-100 dark:bg-gray-800" : ""}`
            }
        >
            {openNav && (
                <p className="font-semibold font-sans text-gray-700 dark:text-white">
                    {name}
                </p>
            )}
            {!openNav && (
                <Tooltip
                    componentsProps={{
                        tooltip: {
                            sx: {
                                fontSize: "0.8rem", // or '16px', '1.2em', etc.
                            },
                        },
                    }}
                    title={name}
                    placement="left"
                >
                    <span className="text-gray-600 text-lg dark:text-white">
                        {icon}
                    </span>
                </Tooltip>
            )}
            {openNav && (
                <span className="text-gray-600 dark:text-white">{icon}</span>
            )}
        </NavLink>
    );
};

export default ListItem;
