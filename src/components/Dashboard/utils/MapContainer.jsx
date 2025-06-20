import React from "react";
import { useMap } from "../../../shared/hooks/useMap";
import useView from "../../../shared/hooks/useView";
import { PointsLayerService } from "../../../shared/static/StaticMapData";

const MapContainer = () => {
    const { viewRef } = useMap();
    useView(viewRef, 6, [43, 18.5], "satellite", PointsLayerService);
    return (
        <div
            ref={viewRef}
            className="w-full h-80 rounded-2xl overflow-hidden drop-shadow-md shadow-2xs"
        ></div>
    );
};

export default MapContainer;
