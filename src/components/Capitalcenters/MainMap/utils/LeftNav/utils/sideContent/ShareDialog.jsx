import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "@mui/material";
import toast from "react-hot-toast";
import { BiCopy, BiShare } from "react-icons/bi";
const ShareDialog = ({ open, handleClose }) => {
    const [link, setLink] = useState("");
    function getBaseUrl() {
        return window.location.href;
    }
    useEffect(() => {
        setLink(getBaseUrl());
    }, []);
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
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Share Map"}</DialogTitle>
            <DialogContent>
                <div className="flex items-center justify-center gap-4">
                    {/* link input */}
                    <Input
                        value={link}
                        type="text"
                        className="p-inputtext-lg"
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
            </DialogContent>
        </Dialog>
    );
};

export default ShareDialog;
