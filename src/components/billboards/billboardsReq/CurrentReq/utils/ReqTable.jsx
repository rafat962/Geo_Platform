/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useReqTableData } from "../hooks/useReqTableData";
import { TableSkeleton } from "../../../../../shared/ui/TableSkeleton";
import { BiSearch } from "react-icons/bi";
import useScrollToRecord from "../hooks/useScrollToRecord";
import MenuToggle from "./MenuToggle";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import {
    orientationDomainFN,
    statusDomainFN,
    typeDomainFN,
} from "../../shared/CentralBillDomains";
import { DataConvert } from "../../../../../shared/helpers/DateConvintion";
// --------------- header apper ---------------
const headCells = [
    {
        id: "procdures",
        numeric: true,
        disablePadding: false,
        label: "إجراءات",
    },

    {
        id: "city",
        numeric: true,
        disablePadding: false,
        label: "المدينة",
    },
    {
        id: "street_name",
        numeric: true,
        disablePadding: false,
        label: "إسم الشارع",
    },
    {
        id: "type",
        numeric: true,
        disablePadding: false,
        label: "النوع",
    },
    {
        id: "orientation",
        numeric: false,
        disablePadding: false,
        label: "إتجاه اللوحة",
    },
    {
        id: "install_date",
        numeric: false,
        disablePadding: false,
        label: "تاريخ التركيب",
    },
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "حالة اللوحة",
    },
    {
        id: "code",
        numeric: true,
        disablePadding: false,
        label: "الكود",
    },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
    // get table data
    // lan
    const { t } = useTranslation();
    // -----------
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={"right"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {t(headCell.label)}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function ReqTable({ view }) {
    // lan
    const { t } = useTranslation();
    // -----------
    const { isLoading, billboardsData } = useReqTableData();

    const [rows, setRows] = React.useState([]);
    const [filterdRows, setFilterdRows] = React.useState([]);
    React.useEffect(() => {
        if (billboardsData) {
            setRows(billboardsData);
            if (searchText === "") {
                setFilterdRows(billboardsData);
            }
        }
    }, [billboardsData]);

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    // ---------------------- Search Logic ----------------------
    const [searchText, setSearchText] = React.useState("");
    function handleSearch(value) {
        setSearchText(value);
        if (value === "") {
            setFilterdRows(rows);
        }
        // } else {
        //     setFilterdRows(() =>
        //         rows.filter((item) => {
        //             return matrialDomainFN(item.attributes.MATERIALNAME_AR)
        //                 ?.toLowerCase()
        //                 .includes(value.toLowerCase());
        //         })
        //     );
        // }
    }
    // ---------------------- row per page ----------------------
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    // ---------------------- row click ----------------------
    const handleClick = (event, id, row) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = [id];
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        useScrollToRecord(row, view, "scroll");
        setSelected(newSelected);
    };
    // ---------------------- change page ----------------------
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - filterdRows?.length)
            : 0;

    const visibleRows = React.useMemo(
        () =>
            [...filterdRows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, filterdRows]
    );
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* SearchBar */}
            <div className=" flex flex-row-reverse items-center justify-center group w-full my-2 mb-4 border-b-[1.25px] border-b-blue-900 focus-within:border-b-cyan-500 trans ">
                <span>
                    <BiSearch className=" group-focus-within:text-blue-600 text-xl cursor-pointer hover:text-blue-500 trans" />
                </span>
                <input
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={`${t("البحث بواسطة مادة البناء")}`}
                    className="text-right p-2 w-full placeholder:text-right placeholder:pr-1 focus:outline-none"
                    type="text"
                />
            </div>
            {isLoading && <TableSkeleton />}
            {!isLoading && (
                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={"medium"}
                            >
                                <EnhancedTableHead
                                    numSelected={selected?.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {visibleRows.map((row) => {
                                        const isItemSelected =
                                            selected.includes(
                                                row.attributes.OBJECTID
                                            );
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(
                                                        event,
                                                        row.attributes.OBJECTID,
                                                        row
                                                    )
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.attributes.OBJECTID}
                                                selected={isItemSelected}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <TableCell align="right">
                                                    <MenuToggle item={row} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.attributes.city}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.attributes.street_name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {typeDomainFN(
                                                        row.attributes.type
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {orientationDomainFN(
                                                        row.attributes
                                                            .orientation
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {DataConvert(
                                                        row.attributes
                                                            .install_date
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {statusDomainFN(
                                                        row.attributes.status
                                                    )}
                                                </TableCell>

                                                <TableCell align="right">
                                                    {row.attributes.code}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 53 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={5} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filterdRows?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            showFirstButton
                            showLastButton
                        />
                    </Paper>
                </Box>
            )}
        </motion.div>
    );
}
