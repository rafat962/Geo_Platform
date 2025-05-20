import React, { createContext, useContext } from "react";
import { HiMiniChevronDown, HiMiniChevronRight } from "react-icons/hi2";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import { useSideBar } from "../context/SideContext";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const ToggleContext = createContext();

const ToggleList = ({ children, openNav }) => {
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    return (
        <ToggleContext.Provider value={{ openNav, t, isRTL }}>
            <div className=" w-fit">{children}</div>
        </ToggleContext.Provider>
    );
};

const Header = ({ handleClick, headName, icon, open }) => {
    const { openNav, isRTL } = useContext(ToggleContext);
    const { dispatch } = useSideBar();
    const handleToggleNav = () => {
        dispatch({ type: "openNav" });
        dispatch({ type: "NavWidth" });
    };
    return (
        <ListItemButton
            disableRipple
            disableTouchRipple
            sx={{
                padding: 0,
                margin: 0,
                minHeight: "auto",
                "&:hover": {
                    backgroundColor: "transparent",
                },
                width: "100%",
            }}
            onClick={handleClick}
        >
            <li
                className={`${open && "bg-gray-200 dark:bg-gray-700"} ${
                    openNav
                        ? ` ${isRTL ? " pl-4" : "pr-5"} justify-between w-full `
                        : "justify-center w-fit "
                }  z-10 flex items-center  cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700  trans rounded-xl  my-1`}
            >
                {openNav && (
                    <span>
                        {open ? <HiMiniChevronDown /> : <HiMiniChevronRight />}
                    </span>
                )}
                <div className="z-10 flex items-center justify-end p-2 px-3  space-x-4 w-fit ">
                    {openNav && (
                        <p className="font-semibold font-sans text-gray-700 dark:text-white">
                            {headName}
                        </p>
                    )}
                    {!openNav && (
                        <Tooltip
                            onClick={handleToggleNav}
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        fontSize: "0.8rem", // or '16px', '1.2em', etc.
                                    },
                                },
                            }}
                            title={headName}
                            placement="left"
                        >
                            <span className="text-gray-600 dark:text-white">
                                {icon}
                            </span>
                        </Tooltip>
                    )}
                    {openNav && (
                        <span className="text-gray-600 dark:text-white">
                            {icon}
                        </span>
                    )}
                </div>
            </li>
        </ListItemButton>
    );
};
const SubHeader = ({ headName, handleClick, open }) => {
    const { isRTL } = useContext(ToggleContext);
    return (
        <ListItemButton
            disableRipple
            disableTouchRipple
            sx={{
                padding: 0,
                margin: 0,
                minHeight: "auto",
                "&:hover": {
                    backgroundColor: "transparent",
                },
                width: "100%",
            }}
            className={`${isRTL ? "before:right-4 before:rounded-r-3xl" : "before:left-4 before:rounded-l-3xl"} listVerticalLine`}
            onClick={handleClick}
        >
            <li
                className={`${
                    open && "bg-gray-100 dark:bg-gray-700"
                } mr-10 flex items-center justify-end p-2 px-3 rounded-xl text-gray-700 space-x-4 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-50 w-37 trans`}
            >
                {open ? (
                    <HiMiniChevronDown className="dark:text-white" />
                ) : (
                    <HiMiniChevronRight className="dark:text-white" />
                )}
                <p className="font-semibold font-sans dark:text-white">
                    {headName}
                </p>
            </li>
        </ListItemButton>
    );
};
const Body = ({ children, open, type = "main" }) => {
    const { openNav, isRTL } = useContext(ToggleContext);
    return (
        openNav && (
            <Collapse
                className="relative py-2"
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <List
                    className={
                        type === "main"
                            ? `listHorizntalLine ${isRTL ? "after:right-4" : "after:left-4"} `
                            : `SublistHorizntalLine ${isRTL ? "after:right-15" : "after:left-15"}`
                    }
                    component="div"
                    disablePadding
                >
                    {children}
                </List>
            </Collapse>
        )
    );
};

const Item = ({ name, type = "main", url, disable = true }) => {
    const { isRTL } = useContext(ToggleContext);
    return (
        <ListItemButton
            sx={{
                "&:hover": {
                    backgroundColor: "transparent", // Remove hover background
                },
                pr: 5,
                width: "100%",
                margin: 0, // Remove default margin
                padding: 0,
            }}
            className={
                type === "main"
                    ? `${isRTL ? "before:right-4 before:rounded-r-3xl" : "before:left-4 before:rounded-l-3xl"} listVerticalLine`
                    : `SublistVerticalLine ${isRTL ? "before:right-15 before:rounded-r-3xl" : "before:left-15 before:rounded-l-3xl"}`
            }
        >
            <NavLink
                to={disable ? "" : url}
                className={({ isActive }) =>
                    `${isActive ? "bg-gray-100 dark:bg-gray-800" : ""} ${
                        type === "main"
                            ? "mainListItem trans"
                            : "subListItem trans"
                    }
                `
                }
            >
                <p
                    className={`text-gray-700 font-semibold font-sans  ${disable ? "text-slate-500 dark:text-slate-500" : "dark:text-white"}`}
                >
                    {name}
                </p>
            </NavLink>
        </ListItemButton>
    );
};

ToggleList.Header = Header;
ToggleList.Body = Body;
ToggleList.Item = Item;
ToggleList.SubHeader = SubHeader;
export default ToggleList;
