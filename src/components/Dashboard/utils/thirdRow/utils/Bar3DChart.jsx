/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
    dataset2024,
    valueFormatter,
    dataset2022,
    dataset2023,
} from "../../data/BarChart";
import { BarChart } from "@mui/x-charts/BarChart";
import styles from "./bar3DChart.module.css";
import { useGetDarkmode } from "../../../../../shared/hooks/useGetDarkmode";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
const Bar3DChart = () => {
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    const [year, setYear] = useState(2024); // Initial selected year
    const [dataset, setDataset] = useState(dataset2024); // Initial selected year
    function handleChangeYear(year) {
        setYear(year);
        if (year === 2022) setDataset(dataset2022);
        if (year === 2023) setDataset(dataset2023);
        if (year === 2024) setDataset(dataset2024);
    }
    const { mode } = useGetDarkmode();
    return (
        <div className="p-1 md:p-4 flex flex-col lg:flex-1/2 flex-1/5 bg-white dark:bg-gray-900 dark:text-gray-200 h-full rounded-2xl drop-shadow-xl shadow-xl ring-1 ring-gray-300">
            {/* top head */}
            <div
                className={`flex ${isRTL ? "" : "flex-row-reverse"}  items-center w-full justify-between`}
            >
                {/* select */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel
                        className={
                            mode?.includes("dark") ? styles.txtwhite : ""
                        }
                        id="demo-controlled-open-select-label"
                    >
                        {t("Year")}
                    </InputLabel>
                    <Select
                        className={mode ? styles.txtwhite : ""}
                        value={year}
                        onChange={(e) => handleChangeYear(e.target.value)}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        label={t("Year")}
                    >
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                    </Select>
                </FormControl>
                <div
                    className={`text-end flex flex-col  ${isRTL ? "items-end " : "items-start "} justify-start  space-y-2`}
                >
                    <h1 className=" text-xl md:text-2xl font-bold">
                        {t("توزيع حالة المباني خلال العام")}
                    </h1>
                    <p className=" text-sm md:text-base font-semibold text-gray-600">
                        {t(
                            "مقارنة بين المباني القائمة وتحت الإنشاء والمباني المهجورة"
                        )}
                    </p>
                </div>
            </div>

            {/* legend */}
            <div className="flex items-center w-full justify-center md:justify-start px-4 space-x-6">
                {/* key container */}
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#00a76f]"></div>
                        <p className="text-sm font-semibold">{t("قائم")}</p>
                    </div>
                    <p className="text-md font-bold text-[#00a76f]" dir="rtl">
                        2000 {t("مبنى")}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#ffab00]"></div>
                        <p className="text-sm font-semibold">
                            {t("تحت الإنشاء")}
                        </p>
                    </div>
                    <p className="text-md font-bold text-[#ce931d]" dir="rtl">
                        3500 {t("مبنى")}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                        <p className="text-sm font-semibold">{t("مهجور")}</p>
                    </div>
                    <p className="text-md font-bold text-[#22c55e]" dir="rtl">
                        446 {t("مبنى")}
                    </p>
                </div>
            </div>

            {/* bar chart */}
            <div className="flex-1/2 h-full ">
                <BarChart
                    className={mode ? styles.txtwhite : ""}
                    height={300}
                    dataset={dataset}
                    grid={{ horizontal: true }}
                    sx={{
                        "& .MuiChartsGrid-line": {
                            stroke: "#ccc",
                            strokeDasharray: "4 4",
                        },
                        "& .MuiChartsAxis-tickLabel": {
                            fill: mode === "dark" ? "#fff" : "#000",
                        },
                        "& .MuiChartsAxis-line": {
                            stroke: mode === "dark" ? "#aaa" : "#000",
                        },
                        margin: 0,
                        padding: 0,
                    }}
                    series={[
                        {
                            dataKey: "existing",
                            label: t("قائم"),
                            valueFormatter,
                            stack: "total",
                            color: "#00a76f",
                        },
                        {
                            dataKey: "underConstruction",
                            label: t("تحت الإنشاء"),
                            valueFormatter,
                            stack: "total",
                            color: "#ffab00",
                        },
                        {
                            dataKey: "abandoned",
                            label: t("مهجور"),
                            valueFormatter,
                            stack: "total",
                            color: "#22c55e",
                        },
                    ]}
                    borderRadius={20}
                    xAxis={[{ scaleType: "band", dataKey: "month" }]}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Bar3DChart;
