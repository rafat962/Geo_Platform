import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { mobileOS } from "../../data/chartsData";

const Pie3DChart = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    return (
        <div className="flex flex-col w-full  flex-1/5 bg-white dark:bg-gray-900 dark:text-gray-200 h-full rounded-2xl drop-shadow-xl shadow-xl ring-1 ring-gray-300 p-4">
            {/* Header */}
            <div className="flex flex-col items-end justify-start gap-1">
                <h1 className="text-2xl font-bold tracking-wide">
                    جميع المبانى
                </h1>
                <p className="text-gray-500 text-lg font-semibold tracking-tight">
                    تصنيف المبانى تحت إدارة مكة
                </p>
            </div>
            {/* Pie Chart */}
            <div className="flex items-center justify-center w-full h-fit relative  ">
                <PieChart
                    height={300}
                    width={10}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },
                    }}
                    onHighlightChange={
                        (event) => {
                            if (event)
                                return setHoveredItem(
                                    mobileOS[event.dataIndex]
                                );
                            setHoveredItem(null);
                        }
                        // setHoveredItem(d?.data ?? null)
                    }
                    series={[
                        {
                            data: mobileOS,
                            innerRadius: 90,
                            outerRadius: 140,
                            arcLabel: (params) => params.label ?? "",
                            highlightScope: {
                                fade: "global",
                                highlight: "item",
                            },
                        },
                    ]}
                />
                {/* Center Label */}
                <div className="absolute space-y-2 mx-auto w-fit h-fit  flex flex-col items-center justify-center text-3xl">
                    <h1
                        className={`text-3xl font-bold tracking-wide ${hoveredItem?.text}`}
                    >
                        {hoveredItem ? hoveredItem.label : "الكل"}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 font-semibold text-md font-sec tracking-wide">
                        {hoveredItem ? hoveredItem.value + " مبنى" : "320 مبنى"}
                    </p>
                </div>
            </div>
            {/* legend */}
            <div className=" absolute bottom-0 left-0 m-auto  flex flex-col md:flex-row items-start md:items-center w-full justify-center px-4 space-x-2">
                {/* key conteiner */}
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                        {/* key */}
                        <div className="w-3 h-3 rounded-full bg-[#004b50]"></div>
                        {/* text */}
                        <p className="text-sm font-semibold">سكنى</p>
                    </div>
                    {/* building num */}
                    <p className="text-sm font-bold text-[#004b50]" dir="rtl">
                        869 مبنى
                    </p>
                </div>
                {/* key conteiner */}
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                        {/* key */}
                        <div className="w-3 h-3 rounded-full bg-[#007867]"></div>
                        {/* text */}
                        <p className="text-sm font-semibold">تجارى</p>
                    </div>
                    {/* building num */}
                    <p
                        className="text-sm font-bold text-[#007867] dark:text-gr"
                        dir="rtl"
                    >
                        360 مبنى
                    </p>
                </div>
                {/* key conteiner */}
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                        {/* key */}
                        <div className="w-3 h-3 rounded-full bg-[#006c9c]"></div>
                        {/* text */}
                        <p className="text-sm font-semibold">دينى</p>
                    </div>
                    {/* building num */}
                    <p className="text-sm font-bold text-[#006c9c]" dir="rtl">
                        120 مبنى
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pie3DChart;
