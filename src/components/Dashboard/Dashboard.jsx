/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Taps from "./utils/Taps";
import MapContainer from "./utils/MapContainer";
import Charts3D from "./utils/thirdRow/Charts3D";

const taps = [
    {
        name: "عدد المبانى السكنية",
        number: "896",
        textColor: "text-amber-500 dark:text-amber-200",
        bgColor: "bg-amber-200 dark:bg-amber-600",
        imgPath: "/Dashboard/buildings.png",
    },
    {
        name: "عدد المدارس",
        number: "35",
        textColor: "text-cyan-500 dark:text-cyan-200",
        bgColor: "bg-cyan-200 dark:bg-cyan-600",
        imgPath: "/Dashboard/school.png",
    },
    {
        name: "عدد المستشفيات",
        number: "12",
        textColor: "text-red-500 dark:text-red-200",
        bgColor: "bg-red-200 dark:bg-red-600",
        imgPath: "/Dashboard/hospital.png",
    },
    {
        name: "عدد المراكز التجارية",
        number: "55",
        textColor: "text-blue-500 dark:text-blue-200",
        bgColor: "bg-blue-200 dark:bg-blue-600",
        imgPath: "/Dashboard/shop.png",
    },
];

const Dashboard = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-fit  p-0.5 md:p-2"
        >
            <div className="flex flex-col items-start justify-start ">
                {/* first Row Taps */}
                <Taps taps={taps} />
                {/* second Row Map */}
                <div className="w-full h-fit py-2">
                    <MapContainer />
                </div>
                {/* third Row Charts */}
                <div className=" w-full min-h-fit overflow-hidden">
                    <Charts3D />
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
