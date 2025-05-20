import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import i18next from "i18next";
const Langage = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [lan, setLan] = useState("en");
    useEffect(() => {
        const currLan = JSON.parse(localStorage.getItem("lang"));
        setLan(currLan);
    }, []);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (lan) => {
        localStorage.setItem("lang", JSON.stringify(lan));
        setLan(lan);
        i18next.changeLanguage(lan);
        setAnchorEl(null);
    };
    return (
        <div>
            <Avatar
                variant="rounded"
                className="cursor-pointer active:scale-110 trans "
                src={
                    lan === "en"
                        ? "/header/English.png"
                        : lan === "fr"
                          ? "/header/French.png"
                          : "/header/Arabic.png"
                }
                sx={{
                    width: 40,
                    height: 40,
                }}
                onClick={handleClick}
            ></Avatar>
            <Menu
                arrow
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={() => handleClose("ar")}>
                    <div className="flex items-center justify-center space-x-6">
                        <div className="w-8 h-8 object-cover">
                            <img className="" src="/header/Arabic.png" alt="" />
                        </div>
                        <p className="text-sm tracking-wider">Arabic</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={() => handleClose("en")}>
                    <div className="flex items-center justify-center space-x-6">
                        <div className="w-8 h-8 object-cover">
                            <img
                                className=""
                                src="/header/English.png"
                                alt=""
                            />
                        </div>
                        <p className="text-sm tracking-wider">English</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={() => handleClose("fr")}>
                    <div className="flex items-center justify-center space-x-6">
                        <div className="w-8 h-8 object-cover">
                            <img className="" src="/header/French.png" alt="" />
                        </div>
                        <p className="text-sm tracking-wider">French</p>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Langage;
