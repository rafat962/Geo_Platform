import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { mobileOS } from "../../data/chartsData";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Pie3DChart = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    return (
        <div className="flex flex-col w-full flex-1/5 bg-white dark:bg-gray-900 dark:text-gray-200 h-full rounded-2xl drop-shadow-xl shadow-xl ring-1 ring-gray-300 p-0.5 md:p-4">
            {/* Header */}
            <div
                className={`flex ${isRTL ? "items-end" : "items-start"}  flex-col  justify-start gap-1 px-2`}
            >
                <h1 className="text-2xl font-bold tracking-wide">
                    {t("جميع المبانى")}
                </h1>
                <p className="text-gray-500 text-lg font-semibold tracking-tight">
                    {t("تصنيف المبانى تحت إدارة مكة")}
                </p>
            </div>
            {/* Pie Chart */}
            <div className="flex items-center justify-center w-full h-fit relative">
                <PieChart
                    height={300}
                    width={10}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },
                    }}
                    onHighlightChange={(event) => {
                        if (event)
                            return setHoveredItem(mobileOS[event.dataIndex]);
                        setHoveredItem(null);
                    }}
                    series={[
                        {
                            data: mobileOS,
                            innerRadius: 90,
                            outerRadius: 140,
                            arcLabel: (params) => t(params.label) ?? "",
                            highlightScope: {
                                fade: "global",
                                highlight: "item",
                            },
                        },
                    ]}
                />

                {/* Center Label */}
                <div className="absolute space-y-2 mx-auto w-fit h-fit flex flex-col items-center justify-center text-2xl">
                    <h1 className="text-3xl font-bold tracking-wide">
                        {hoveredItem ? hoveredItem.label : t("الكل")}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 font-semibold  font-thr tracking-wide">
                        {hoveredItem
                            ? `${hoveredItem.value} ${t("مبنى")}`
                            : `320 ${t("مبنى")}`}
                    </p>
                </div>
            </div>

            {/* Legend */}
            <div className="hidden md:absolute bottom-0 left-0 m-auto flex flex-col md:flex-row items-start md:items-center w-full justify-center px-4 space-x-2">
                {/* سكنى */}
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#004b50]"></div>
                        <p className="text-sm font-semibold">{t("سكنى")}</p>
                    </div>
                    <p className="text-sm font-bold text-[#004b50]" dir="rtl">
                        869 {t("مبنى")}
                    </p>
                </div>

                {/* تجارى */}
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#007867]"></div>
                        <p className="text-sm font-semibold">{t("تجارى")}</p>
                    </div>
                    <p className="text-sm font-bold text-[#007867]" dir="rtl">
                        360 {t("مبنى")}
                    </p>
                </div>

                {/* دينى */}
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#006c9c]"></div>
                        <p className="text-sm font-semibold">{t("دينى")}</p>
                    </div>
                    <p className="text-sm font-bold text-[#006c9c]" dir="rtl">
                        120 {t("مبنى")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pie3DChart;
