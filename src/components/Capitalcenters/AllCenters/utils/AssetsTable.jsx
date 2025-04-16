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
import { useTableData } from "../hooks/useTableData";
import { TableSkeleton } from "../../../../shared/ui/TableSkeleton";
import {
    BuildingStateFN,
    matrialDomainFN,
} from "../../shared/helpers/CentralCodeToDomain";
import { BiSearch } from "react-icons/bi";
import useScrollToRecord from "../hooks/useScrollToRecord";
import MenuToggle from "./MenuToggle";
import { motion } from "framer-motion";
// --------------- header apper ---------------
const headCells = [
    {
        id: "procdures",
        numeric: true,
        disablePadding: false,
        label: "إجراءات",
    },
    {
        id: "LandUse",
        numeric: true,
        disablePadding: false,
        label: "إستعمال المبنى",
    },
    {
        id: "HEIGHT",
        numeric: true,
        disablePadding: false,
        label: "الإرتفاع",
    },
    {
        id: "STATUS_AR",
        numeric: true,
        disablePadding: false,
        label: "حالة المبنى",
    },
    {
        id: "MATERIALNAME_AR",
        numeric: true,
        disablePadding: false,
        label: "مادة البناء",
    },
    {
        id: "OBJECTID",
        numeric: false,
        disablePadding: false,
        label: "كود المبنى",
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
                            {headCell.label}
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

export default function AssetsTable({ view }) {
    const { isLoading, buildingsData } = useTableData();
    const [rows, setRows] = React.useState([]);
    const [filterdRows, setFilterdRows] = React.useState([]);
    React.useEffect(() => {
        if (buildingsData) {
            setRows(buildingsData);
            if (searchText === "") {
                setFilterdRows(buildingsData);
            }
        }
    }, [buildingsData]);

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
        } else {
            setFilterdRows(() =>
                rows.filter((item) => {
                    return matrialDomainFN(item.attributes.MATERIALNAME_AR)
                        ?.toLowerCase()
                        .includes(value.toLowerCase());
                })
            );
        }
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
                    placeholder="البحث بواسطة مادة البناء"
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
                                                    {row.attributes.LandUse}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.attributes.HEIGHT}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {BuildingStateFN(
                                                        row.attributes.STATUS_AR
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {matrialDomainFN(
                                                        row.attributes
                                                            .MATERIALNAME_AR
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.attributes.OBJECTID}
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
