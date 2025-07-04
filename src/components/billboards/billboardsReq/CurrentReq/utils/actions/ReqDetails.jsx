/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import useScrollToRecord from "../../hooks/useScrollToRecord";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataConvert } from "../../../../../../shared/helpers/DateConvintion";
import { Galleria } from "primereact/galleria";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import {
    orientationDomainFN,
    ownerDomainFN,
    statusDomainFN,
    typeDomainFN,
} from "../../../shared/CentralBillDomains";
const ReqDetails = memo(({ data, dispatch, view }) => {
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    const attr = data.attributes;
    const handleBack = () => {
        useScrollToRecord(null, view, "end");
        dispatch({ type: "HIDE_DETAILS" });
    };
    // gallary logic
    const [images, setImages] = useState(null);
    useEffect(() => {
        setImages([
            {
                itemImageSrc: "/billboards/dashboards/bill1.jpg",
                alt: "Description for Image 1",
                title: "Title 1",
            },
            {
                itemImageSrc: "/billboards/dashboards/bill2.jpg",
                alt: "Description for Image 1",
                title: "Title 1",
            },
        ]);
    }, []);

    const itemTemplate = (item) => {
        return (
            <img
                src={item.itemImageSrc}
                alt={item.alt}
                style={{ width: "100%" }}
            />
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <PrimeReactProvider value={{ ripple: true }}>
                <div className="w-full h-fit space-y-6">
                    {/* header */}
                    <div className="w-full flex items-center justify-between px-2">
                        {/* backButton */}
                        <span
                            onClick={handleBack}
                            className="text-2xl cursor-pointer hover:text-blue-800 hover:-translate-x-0.5 hover:drop-shadow-2xl trans"
                        >
                            <HiArrowLeft />
                        </span>
                        {/* AssetName */}
                        <span>
                            {t("الأصل رقم")}
                            {"  --  "}
                            <span className="dark:text-red-500 text-blue-950 font-semibold">
                                {attr.OBJECTID}
                            </span>
                        </span>
                    </div>
                    {/* Body */}
                    {/* main info */}
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="w-full py-2  flex items-center justify-center">
                            {/* headName */}
                            <div className=" select-none group flex  items-center justify-center  px-3 md:px-8 p-2 rounded-full dark:bg-black  bg-sec text-lg font-semibold tracking-wider  ">
                                {t("بيانات اللوحة")}
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">
                                            {t("كود اللوحة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("المدينة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("إسم الشارع")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("نوع اللوحة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("مقاسات اللوحة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("الإتجاه")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("تاريخ التركيب")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("تاريخ اخر صيانة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("المالك")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("حالة اللوحة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("ملاحظات")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        key={attr?.OBJECTID}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell align="right" scope="attr">
                                            {attr?.code}
                                        </TableCell>
                                        <TableCell align="right" scope="attr">
                                            {attr?.city}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.street_name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {typeDomainFN(attr?.type)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.size}
                                        </TableCell>
                                        <TableCell align="right">
                                            {orientationDomainFN(
                                                attr?.orientation
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {DataConvert(attr?.install_date)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {DataConvert(
                                                attr?.LAST_MAINTENANCE_DATE
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {ownerDomainFN(attr?.ownership)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {statusDomainFN(attr?.status)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.notes}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    {/* 2and */}
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className=" w-full py-2  flex items-center justify-center">
                            {/* headName */}
                            <div className=" select-none group flex  items-center justify-center px-3 md:px-8 p-2p-2 rounded-full dark:bg-black  bg-sec text-lg font-semibold tracking-wider  ">
                                {t("صور اللوحة")}
                            </div>
                        </div>
                        {/* img */}
                        <div className="card">
                            <Galleria
                                value={images}
                                style={{ maxWidth: "640px" }}
                                showThumbnails={false}
                                showIndicators
                                item={itemTemplate}
                            />
                        </div>
                    </div>
                </div>
            </PrimeReactProvider>
        </motion.div>
    );
});

export default ReqDetails;
