import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import {
    AppBar,
    IconButton,
    Input,
    Slide,
    Toolbar,
    Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { BiCopy, BiShare } from "react-icons/bi";
import TransferList from "./TransferList";
import { useSearchParams } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ShareDialog = ({ open, handleClose }) => {
    const [link, setLink] = useState("");
    function getBaseUrl() {
        return (
            window.location.origin +
            window.location.pathname +
            window.location.search
        );
    }
    const [searchParams, SetSearchParams] = useSearchParams();
    useEffect(() => {
        setLink(getBaseUrl());
    }, [searchParams.get("gIjxYweHWxrC1")]);
    const show = (message) => {
        toast.success(message);
    };

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(link);
            show("Link Copied to clipboard Successfully!");
        } catch (err) {
            console.error("Failed", err);
        }
    }

    function shareToWhatsApp() {
        const message = `Check out this map: ${link}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    }
    // transfar list

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
                    {/* permissions */}
                    <TransferList />
                    {/* actions */}
                    <div className="flex items-center justify-center gap-4 w-fit outline-1 p-2 px-8 rounded-xl">
                        <h1>Final Url To Share : </h1>
                        {/* link input */}
                        <Input
                            value={link}
                            type="text"
                            className="p-inputtext-lg w-fit"
                            placeholder="Large"
                            variant="filled"
                            disabled
                        />
                        {/* Copy link */}
                        <Button
                            onClick={copyToClipboard}
                            variant="outlined"
                            startIcon={<BiCopy className="mx-1 text-2xl" />}
                        >
                            Copy
                        </Button>
                        {/* Share to whatsapp */}
                        <Button
                            onClick={shareToWhatsApp}
                            variant="outlined"
                            color="danger"
                            startIcon={<BiShare className="mx-1 text-2xl" />}
                        >
                            WhatsApp
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ShareDialog;
