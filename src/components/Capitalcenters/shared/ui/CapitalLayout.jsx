/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumb from "../../../../shared/ui/Breadcrumb ";
import styled from "styled-components";
import { motion } from "framer-motion";

const Body = styled.div`
    /* Hide scrollbar for WebKit (Chrome, Safari, Edge) */
    &::-webkit-scrollbar {
        width: 2px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;
const CapitalLayout = () => {
    const [title, setTitle] = useState("");
    const location = useLocation();

    useEffect(() => {
        const currentLocation = location.pathname.split("/")[2];
        switch (currentLocation) {
            case "AllCenters":
                setTitle("كل الأصول");
                break;
            case "AddCenter":
                setTitle("إضافة أصل");
                break;
            default:
                setTitle("منطقة العاصمة");
        }
    }, [location.pathname]); // Depend on location.pathname to run the effect when the route changes

    return (
        // main container

        <Body className="relative w-full h-fit flex flex-col items-start justify-start pt-3 px-8 space-y-5 overflow-auto ">
            {/* Breadcrumb  */}
            <div className="">
                <Breadcrumb />
            </div>
            {/* main card */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white dark:bg-slate-900  w-full h-full rounded-md drop-shadow-lg outline-2 outline-thr my-2 mb-4"
            >
                {/* header */}
                <div className=" w-full py-4  flex items-center justify-end">
                    {/* headName */}
                    <div className=" select-none group flex border-r-3 border-r-indigo-800 items-center justify-center pl-10 px-8 p-2 rounded-l-full  bg-sec dark:bg-slate-700 text-lg font-semibold tracking-wider w-58 ">
                        {title}
                    </div>
                </div>
                {/* body */}
                <motion.div className="w-full h-full p-4">
                    <Outlet />
                </motion.div>
            </motion.div>
        </Body>
    );
};

export default CapitalLayout;
