import React from "react";
import { useMap } from "../../../shared/hooks/useMap";

const MapContainer = () => {
    const { viewRef } = useMap();
    return (
        <div
            ref={viewRef}
            className="w-full h-80 rounded-2xl overflow-hidden drop-shadow-md shadow-2xs"
        ></div>
    );
};

export default MapContainer;
