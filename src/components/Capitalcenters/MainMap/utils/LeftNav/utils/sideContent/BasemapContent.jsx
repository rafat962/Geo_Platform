import React, { useEffect, useRef } from "react";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import { useNavContext } from "../../../../context/NavContext";
const BasemapContent = () => {
    const BassMapGallaryContainer = useRef();
    const { state } = useNavContext();
    const { view } = state;
    useEffect(() => {
        if (!view || !BassMapGallaryContainer.current) return;
        const basemapGallery = new BasemapGallery({
            view: view,
            container: BassMapGallaryContainer.current,
        });
        return () => {
            if (BassMapGallaryContainer.current) {
                basemapGallery.destroy();
                BassMapGallaryContainer.current = null;
            }
        };
    }, [view]);
    return (
        <div
            className="w-full h-full overflow-auto"
            ref={BassMapGallaryContainer}
        ></div>
    );
};

export default BasemapContent;
