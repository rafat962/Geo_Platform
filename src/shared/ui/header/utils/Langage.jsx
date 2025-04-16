import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const Langage = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Avatar
                variant="rounded"
                className="cursor-pointer active:scale-110 trans "
                src="/public/header/Arabic.png"
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
                <MenuItem onClick={handleClose}>
                    <div className="flex items-center justify-center space-x-6">
                        <div className="w-8 h-8 object-cover">
                            <img
                                className=""
                                src="/public/header/English.png"
                                alt=""
                            />
                        </div>
                        <p className="text-sm tracking-wider">English</p>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <div className="flex items-center justify-center space-x-6">
                        <div className="w-8 h-8 object-cover">
                            <img
                                className=""
                                src="/public/header/Arabic.png"
                                alt=""
                            />
                        </div>
                        <p className="text-sm tracking-wider">Arabic</p>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Langage;
