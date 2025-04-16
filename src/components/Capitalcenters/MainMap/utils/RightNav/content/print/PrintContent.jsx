import React, { useEffect, useRef } from "react";
import { useNavContext } from "../../../../context/NavContext";
import Print from "@arcgis/core/widgets/Print";

const PrintContent = () => {
    const PrintContainer = useRef();
    const { state } = useNavContext();
    const { view } = state;
    useEffect(() => {
        if (!view || !PrintContainer.current) return;
        const basemapGallery = new Print({
            view: view,
            container: PrintContainer.current,
        });
        return () => {
            if (PrintContainer.current) {
                basemapGallery.destroy();
                PrintContainer.current = null;
            }
        };
    }, [view]);
    return (
        <div
            className="w-full h-full overflow-auto py-3"
            ref={PrintContainer}
        ></div>
    );
};

export default PrintContent;
