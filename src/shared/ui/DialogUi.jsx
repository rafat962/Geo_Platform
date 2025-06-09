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
import { useGetUserLogs } from "../../components/Settings/hooks/useSettings";
import DataTable from "./DataTable";
export default function DialogUi({
    content,
    action,
    actionName,
    successMessage,
    handleCloseMenu,
    message,
    preload,
    item,
}) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [tablestate, setTableState] = React.useState(false);
    const [tableData, setTableData] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        setTableState(preload);
        if (preload) {
            const { isSuccess, UserLogs, error } = action;
        }
    };
    const { isSuccess, UserLogs, error } = useGetUserLogs(item);
    const rows = UserLogs?.loginLogs;
    const finalData = rows?.map((item, index) => {
        const dateObj = new Date(item);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
        const day = String(dateObj.getDate()).padStart(2, "0");
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const seconds = String(dateObj.getSeconds()).padStart(2, "0");
        const time = `${hours}:${minutes}:${seconds}`;
        return {
            id: index,
            year,
            month,
            day,
            time,
        };
    });
    // table
    const columns = [
        { field: "id", headerName: "ID", width: 200 },
        { field: "year", headerName: "year", width: 200 },
        { field: "month", headerName: "month", width: 200 },
        { field: "day", headerName: "day", width: 200 },
        { field: "time", headerName: "time", width: 200 },
    ];
    console.log(finalData);

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
            {!tablestate && (
                <>
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
                </>
            )}
            {tablestate && (
                <>
                    <Dialog
                        fullWidth={false}
                        maxWidth={"lg"}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="logout-dialog-title"
                        aria-describedby="logout-dialog-description"
                    >
                        <DialogContent>
                            <DataTable columns={columns} rows={finalData} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>رجوع</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </React.Fragment>
    );
}
