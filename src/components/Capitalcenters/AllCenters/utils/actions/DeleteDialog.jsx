import * as React from "react";
import PropTypes from "prop-types";
import { DialogsProvider, useDialogs } from "@toolpad/core/useDialogs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { PointsLayerService } from "../../../../../shared/static/StaticMapData";
import { useQueryClient } from "@tanstack/react-query";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
function MyCustomDialog({ open, onClose, payload }) {
    return (
        <Dialog fullWidth open={open} onClose={() => onClose()}>
            <DialogTitle>Custom Error Handler</DialogTitle>
            <DialogContent>
                <Alert severity="error">
                    {`An error occurred while deleting item "${payload.id}":`}
                    <pre>{payload.error}</pre>
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Close me</Button>
            </DialogActions>
        </Dialog>
    );
}

MyCustomDialog.propTypes = {
    /**
     * A function to call when the dialog should be closed. If the dialog has a return
     * value, it should be passed as an argument to this function. You should use the promise
     * that is returned to show a loading state while the dialog is performing async actions
     * on close.
     * @param result The result to return from the dialog.
     * @returns A promise that resolves when the dialog can be fully closed.
     */
    onClose: PropTypes.func.isRequired,
    /**
     * Whether the dialog is open.
     */
    open: PropTypes.bool.isRequired,
    /**
     * The payload that was passed when the dialog was opened.
     */
    payload: PropTypes.shape({
        error: PropTypes.string,
        id: PropTypes.string,
    }).isRequired,
};

function DemoContent({ children, item }) {
    const [open, setOpen] = React.useState(false); // for backdrop
    const dialogs = useDialogs();
    const [isDeleting, setIsDeleting] = React.useState(false);
    const query = useQueryClient();
    const handleDelete = async () => {
        const id = await dialogs.prompt("من فضلك أدخل كود الأصل", {
            okText: "حذف",
            cancelText: "إلغاء",
            title: `حذف الأصل رقم ${item.attributes.OBJECTID}`,
        });
        if (+id === item.attributes.OBJECTID) {
            const deleteConfirmed = await dialogs.confirm(
                `هل تريد حذف الأصل رقم ${id}?`,
                {
                    okText: "تأكيد",
                    cancelText: "العودة",
                    title: `تأكيد حذف الأصل رقم ${item.attributes.OBJECTID}`,
                }
            );
            if (deleteConfirmed) {
                setOpen(true);
                PointsLayerService.applyEdits({
                    deleteFeatures: [item],
                })
                    .then(() => {
                        setIsDeleting(true);
                        toast.success(`تم حذف الأصل رقم ${id} بنجاح`, {
                            duration: 2300,
                        });
                    })
                    .catch((error) => {
                        const message =
                            error instanceof Error
                                ? error.message
                                : "Unknown error";
                        dialogs.open(MyCustomDialog, { id, error: message });
                    })
                    .finally(() => {
                        query.invalidateQueries(["buildingsData"]);
                        setIsDeleting(false);
                        setOpen(false);
                    });
            }
        }
    };
    return (
        <>
            <div loading={isDeleting} onClick={handleDelete}>
                {children}
            </div>
            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default function DeleteDialog({ children, item }) {
    return (
        <DialogsProvider>
            <DemoContent item={item}>{children}</DemoContent>
        </DialogsProvider>
    );
}
