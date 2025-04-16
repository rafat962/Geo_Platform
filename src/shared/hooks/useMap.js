/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import useAddWedgites from "./useAddWedgites";
import { PointsLayerService } from "../static/StaticMapData";
import useView from "./useView";

export const useMap = (basemap = "satellite") => {
    const viewRef = useRef(null);
    let [mapViewModel, setView] = useState(null);
    let [mapModel, setmap] = useState(null);
    useEffect(() => {
        const layer = PointsLayerService;
        // --------------- View And Map ---------------
        // 2d view
        let { view, map } = useView(viewRef, basemap, layer);
        setView(view);
        setmap(map);
        // --------------- widgets ---------------
        useAddWedgites(view);
    }, [basemap]);
    return { viewRef, mapViewModel, mapModel };
};
