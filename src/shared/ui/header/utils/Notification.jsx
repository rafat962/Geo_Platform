import React from "react";
import Avatar from "@mui/material/Avatar";
const Notification = () => {
    return (
        <Avatar
            variant="rounded"
            className="cursor-pointer active:scale-110 trans "
            src="/header/bell.png"
            sx={{
                width: 30,
                height: 30,
            }}
        ></Avatar>
    );
};

export default Notification;
