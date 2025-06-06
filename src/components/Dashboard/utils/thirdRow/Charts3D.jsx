import React from "react";
import Pie3DChart from "./utils/Pie3DChart";
import Bar3DChart from "./utils/Bar3DChart";
const Charts3D = () => {
    return (
        <div className="w-full h-full p-0.5 md:p-2">
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 h-fit md:h-105">
                {/* Pie Chart */}
                <Pie3DChart />
                {/* Bar Chart Placeholder */}
                <Bar3DChart />
            </div>
        </div>
    );
};

export default Charts3D;
