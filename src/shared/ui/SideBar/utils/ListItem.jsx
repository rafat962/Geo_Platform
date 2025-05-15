import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { NavLink } from "react-router-dom";

const ListItem = ({
    name,
    icon,
    openNav,
    toUrl,
    target = "_self",
    onClick,
}) => {
    const commonClasses = `flex items-center justify-end p-2 px-3 rounded-xl space-x-4 cursor-pointer w-full trans 
        dark:hover:bg-gray-700 hover:bg-gray-100`;

    const activeClasses = `bg-gray-100 dark:bg-gray-800`;

    const content = (
        <>
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
                                fontSize: "0.8rem",
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
        </>
    );

    if (toUrl) {
        return (
            <NavLink
                onClick={onClick}
                target={target}
                to={toUrl}
                className={({ isActive }) =>
                    `${commonClasses} ${isActive ? activeClasses : ""}`
                }
            >
                {content}
            </NavLink>
        );
    }

    return (
        <div onClick={onClick} className={commonClasses}>
            {content}
        </div>
    );
};

export default ListItem;
