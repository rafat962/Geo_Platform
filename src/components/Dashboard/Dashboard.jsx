/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Taps from "./utils/Taps";
import MapContainer from "./utils/MapContainer";
import Charts3D from "./utils/thirdRow/Charts3D";

const Dashboard = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-fit  p-2"
        >
            <div className="flex flex-col items-start justify-start ">
                {/* first Row Taps */}
                <Taps />
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
