import React, { useEffect } from "react";
import { useMap } from "../../../../shared/hooks/useMap";
import { useNavContext } from "../context/NavContext";
import { PointsLayerService } from "../../../../shared/static/StaticMapData";
import useView from "../../../../shared/hooks/useView";

const MapMain = () => {
    const { viewRef, mapViewModel } = useMap();
    useView(viewRef, "satellite", PointsLayerService);
    const { dispatch } = useNavContext();
    useEffect(() => {
        dispatch({
            type: "view",
            payload: { view: mapViewModel, viewRef: viewRef },
        });
    }, [mapViewModel, viewRef]);
    return (
        <div
            ref={viewRef}
            style={{ width: "100%", height: "100%" }}
            className="w-100 h-100"
        ></div>
    );
};

export default MapMain;
