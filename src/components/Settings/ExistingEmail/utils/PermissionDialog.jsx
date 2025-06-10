/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
    HiMiniArrowUturnLeft,
    HiOutlineArrowRightCircle,
    HiServer,
} from "react-icons/hi2";
import {
    AppBar,
    Backdrop,
    CircularProgress,
    IconButton,
    Input,
    Slide,
    Toolbar,
    Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { BiCopy, BiShare } from "react-icons/bi";
import TransferListPermission from "./TransferListPermission";
import { setPermission } from "../../helpers/settings.apis";
import { useGetPermissions } from "../../hooks/useSettings";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const permissions = [
    "CapitalCenter",
    "NorthArea",
    "LandUse",
    "Reports",
    "Settings",
    "MainMap",
];
const PermissionDialog = ({ open, handleClose, item }) => {
    const [right, setRight] = React.useState([]);
    const [left, setLeft] = React.useState(permissions);
    const show = (message) => {
        toast.success(message);
    };
    // handle add permissions
    const [load, setLoad] = useState(false);
    const addPermissions = async () => {
        setLoad(true);
        const res = await setPermission(item, { permissions: right });
        setLoad(false);
        show("Permissions Updated Successfully");
    };
    // get User Permissions
    const { isSuccess, UserPermissions, error } = useGetPermissions(item);
    useEffect(() => {
        setRight(UserPermissions || []);
    }, [item, UserPermissions]);
    useEffect(() => {
        setLeft((left) => {
            return left.filter((item) => !right.includes(item));
        });
    }, [right]);
    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <HiMiniArrowUturnLeft />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            Map Sharing Permissions
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="flex flex-col items-center justify-start p-10 space-y-8 w-full h-full">
                    {load && (
                        <Backdrop
                            open
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    )}
                    {/* permissions */}
                    {!load && (
                        <TransferListPermission
                            left={left}
                            setLeft={setLeft}
                            right={right}
                            setRight={setRight}
                        />
                    )}
                    {/* actions */}
                    <button
                        onClick={addPermissions}
                        className="flex items-center justify-center gap-4 w-fit outline-1 p-2 px-8 rounded-xl cursor-pointer hover:bg-gray-100 trans"
                    >
                        <h1>ADD</h1>
                    </button>
                </div>
            </Dialog>
        </>
    );
};

export default PermissionDialog;
