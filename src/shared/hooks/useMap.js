/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
// import useAddWedgites from "./useAddWedgites";
import useView from "./useView";

export const useMap = (
    basemap = "satellite",
    zoom = 11,
    center = [39.22, 21.45],
    ...layers
) => {
    const viewRef = useRef(null);
    let [mapViewModel, setView] = useState(null);
    let [mapModel, setmap] = useState(null);
    useEffect(() => {
        // --------------- View And Map ---------------
        // 2d view
        let { view, map } = useView(viewRef, zoom, center, basemap, ...layers);
        setView(view);
        setmap(map);
        // Wait for the view to be ready before watching

        // --------------- widgets ---------------
        // useAddWedgites(view);
    }, [basemap]);
    return { viewRef, mapViewModel, mapModel };
};
