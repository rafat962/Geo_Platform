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
import {
    BuildingStateFN,
    matrialDomainFN,
} from "../../../shared/helpers/CentralCodeToDomain";
import { DataConvert } from "../../../../../shared/helpers/DateConvintion";
import { Galleria } from "primereact/galleria";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
const AssetDetails = memo(({ data, dispatch, view }) => {
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    const attr = data.attributes;
    const handleBack = () => {
        useScrollToRecord(null, view, "end");
        dispatch({ type: "endDetails" });
    };
    // gallary logic
    const [images, setImages] = useState(null);
    useEffect(() => {
        setImages([
            {
                itemImageSrc: "/building/4.jpg",
                alt: "Description for Image 1",
                title: "Title 1",
            },
            {
                itemImageSrc: "/building/2.jpg",
                alt: "Description for Image 1",
                title: "Title 1",
            },
            {
                itemImageSrc: "/building/5.jpg",
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
                                {t("معلومات الموقع والهوية الجغرافية")}
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
                                            {t("رقم مميز المنطقة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("رقم مميز القطاع")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("رقم مميز الأمانة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("رقم مميز المحافظة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("رقم مميز البلدية")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("رقم مميز المدينة")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("رقم مميز الحي")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("رقم المخطط")}
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
                                            {attr?.REGION_ID}
                                        </TableCell>
                                        <TableCell align="right" scope="attr">
                                            {attr?.SECTOR_ID}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.AMANA_ID}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.GOVERNORATE_ID}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.MUNICIPALITY_ID}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.CITY_ID}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.DISTRICT_ID}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.DRAWINGNUMBER}
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
                            <div className=" select-none group flex  items-center justify-center px-3 md:px-8 p-2 rounded-full dark:bg-black  bg-sec text-lg font-semibold tracking-wider  ">
                                {t("معلومات المبنى الفنية والإدارية")}
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
                                            {t("النوع الفرعي للاستخدام")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t(
                                                "رقم المميز للاستخدام التفصيلي للمبنى"
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("إستعمال المبنى")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("عدد الأدوار للمبنى")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("سنة الإنشاء للمبنى")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("نوع البناء")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("حالة المبنى")}
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
                                            {attr?.SUBTYPE}
                                        </TableCell>
                                        <TableCell align="right" scope="attr">
                                            {attr?.DETAILSLANDUSE}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.LandUse}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.FLOORSCOUNT}
                                        </TableCell>
                                        <TableCell align="right">
                                            {DataConvert(attr?.START_DATE)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {matrialDomainFN(
                                                attr?.MATERIALNAME_AR
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {BuildingStateFN(attr?.STATUS_AR)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    {/* 3and */}
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className=" w-full py-2  flex items-center justify-center">
                            {/* headName */}
                            <div className=" select-none group flex  items-center justify-center px-3 md:px-8 p-2 rounded-full dark:bg-black  bg-sec text-lg font-semibold tracking-wider  ">
                                {t("بيانات مرجعية وتوثيقية ")}
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
                                            {t("مصدر البيانات")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("الوصف")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("تاريخ الإنشاء")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("اسم منشأ البيانات")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("آخر مستخدم")}
                                        </TableCell>
                                        <TableCell align="right">
                                            {t("اسم المالك")}
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
                                            {attr?.DATASOURCE}
                                        </TableCell>
                                        <TableCell align="right" scope="attr">
                                            {attr?.DESCRIPTION}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.CREATED_DATE}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.CREATED_USER}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.LAST_EDITED_USER}
                                        </TableCell>
                                        <TableCell align="right">
                                            {attr?.OWNERNAME}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    {/* 4and */}
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className=" w-full py-2  flex items-center justify-center">
                            {/* headName */}
                            <div className=" select-none group flex  items-center justify-center px-3 md:px-8 p-2p-2 rounded-full dark:bg-black  bg-sec text-lg font-semibold tracking-wider  ">
                                {t("صور المبنى")}
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

export default AssetDetails;
