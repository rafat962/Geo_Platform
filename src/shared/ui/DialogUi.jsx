/* eslint-disable no-unused-vars */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
export default function DialogUi({
    content,
    action,
    actionName,
    successMessage,
    handleCloseMenu,
    message,
}) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleCloseMenu();
    };
    const query = useQueryClient();
    const handleAction = async () => {
        const res = await action();
        if (res.status === "success") {
            toast.success(res.message);
            query.invalidateQueries(["allUsersData"]);
        } else {
            toast.error("ERROR 404");
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <div className="w-full" onClick={handleClickOpen}>
                {content}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <DialogTitle id="logout-dialog-title">
                    {"Confirm Logout"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="logout-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>رجوع</Button>
                    <Button onClick={handleAction} autoFocus>
                        {actionName}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
