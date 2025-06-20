/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import useSketch from "../../../../shared/hooks/useSketch";
import { useMap } from "../../../../shared/hooks/useMap";
import { useSearchParams } from "react-router-dom";
import { PointsLayerService } from "../../../../shared/static/StaticMapData";
import useView from "../../../../shared/hooks/useView";
const AddMap = () => {
    const { viewRef, mapViewModel, mapModel } = useMap();
    useView(viewRef, "satellite", PointsLayerService);

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if (mapViewModel) {
            useSketch(mapViewModel, mapModel, searchParams, setSearchParams);
        }
    }, [mapViewModel, mapModel]);
    return <div ref={viewRef} className=" w-full h-full "></div>;
};

export default AddMap;
