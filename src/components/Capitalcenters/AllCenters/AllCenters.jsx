/* eslint-disable no-unused-vars */
import React from "react";
import Map from "./utils/Map";
import AssetsTable from "./utils/AssetsTable";
import { useAstsContext } from "./context/AssetsContext";
import AssetDetails from "./utils/actions/AssetDetails";
import AssetUpdate from "./utils/actions/AssetUpdate";
import { motion } from "framer-motion";
import { useMap } from "../../../shared/hooks/useMap";
import { PointsLayerService } from "../../../shared/static/StaticMapData";
import useView from "../../../shared/hooks/useView";
const AllCenters = () => {
    const { viewRef, mapViewModel } = useMap();
    useView(viewRef, 6, [43, 18.5], "satellite", PointsLayerService);
    const { state, dispatch } = useAstsContext();
    const { detailsState, updateState, ItemData } = state;
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
                {!detailsState && !updateState && (
                    <AssetsTable viewRef={viewRef} view={mapViewModel} />
                )}
                {/* showDetails case */}
                {detailsState && (
                    <AssetDetails
                        view={mapViewModel}
                        dispatch={dispatch}
                        data={ItemData}
                    />
                )}
                {/* Update Case */}
                {updateState && (
                    <AssetUpdate
                        view={mapViewModel}
                        dispatch={dispatch}
                        data={ItemData}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default AllCenters;
