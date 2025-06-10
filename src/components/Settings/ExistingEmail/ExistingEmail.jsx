/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DataTable from "../../../shared/ui/DataTable";
import { useGetAllUsers } from "../hooks/useSettings";
import Loader from "../../../shared/ui/Loader";
import MenuUi from "../../../shared/ui/MenuUi";
import { useSelector } from "react-redux";
const ExistingEmail = () => {
    const { role } = useSelector((state) => state.authorization);
    const columns = [
        { field: "id", headerName: "ID", width: 200 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "role", headerName: "Role", width: 200 },
        { field: "active", headerName: "Active", width: 200 },
        { field: "emailActive", headerName: "User Activation", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <MenuUi role={params.row.role} item={params.row.id} />
            ),
        },
    ];
    const [rows, setRows] = useState([]);
    const { isSuccess, AllUser, error } = useGetAllUsers();
    useEffect(() => {
        const finalData = AllUser?.map((item) => {
            item.id = item._id;
            return { ...item };
        });
        setRows(finalData);
    }, [AllUser]);
    return (
        <div className="w-full h-full  p-6">
            {!isSuccess && <Loader />}
            {isSuccess && <DataTable columns={columns} rows={rows} />}
        </div>
    );
};

export default ExistingEmail;
