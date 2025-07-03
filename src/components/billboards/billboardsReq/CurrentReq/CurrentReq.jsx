/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useMap } from "../../../../shared/hooks/useMap";
import useView from "../../../../shared/hooks/useView";
import { billboards } from "../../helpers/billboard.StaticData";
import { useRequestContext } from "./context/ReqContext";
import ReqTable from "./utils/ReqTable";
import ReqDetails from "./utils/actions/ReqDetails";
import ReqUpdate from "./utils/actions/ReqUpdate";
import Map from "./utils/Map";
const CurrentReq = () => {
    const { viewRef, mapViewModel } = useMap(
        "satellite",
        11,
        [39.22, 21.45],
        billboards
    );
    const { state, dispatch } = useRequestContext();
    const { isDetailsOpen, isUpdateMode, itemData } = state;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center w-full space-y-6"
        >
            {/* map */}
            <div className="w-full h-99">
                <Map viewRef={viewRef} />
            </div>
            {/* Table */}
            <div className="w-full">
                {/* Table case */}
                {!isDetailsOpen && !isUpdateMode && (
                    <ReqTable viewRef={viewRef} view={mapViewModel} />
                )}
                {/* showDetails case */}
                {isDetailsOpen && (
                    <ReqDetails
                        view={mapViewModel}
                        dispatch={dispatch}
                        data={itemData}
                    />
                )}
                {/* Update Case */}
                {isUpdateMode && (
                    <ReqUpdate
                        view={mapViewModel}
                        dispatch={dispatch}
                        data={itemData}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default CurrentReq;
