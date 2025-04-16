import React, { useEffect, useRef } from "react";
import { useNavContext } from "../../../../context/NavContext";
import FeatureTable from "@arcgis/core/widgets/FeatureTable.js";
import { PointsLayerService } from "../../../../../../../shared/static/StaticMapData";
const AttributeTableContent = () => {
    const AttributeContainer = useRef();
    const { state } = useNavContext();
    const { view } = state;
    useEffect(() => {
        if (!view || !AttributeContainer.current) return;

        const featureTable = new FeatureTable({
            view: view,
            layer: PointsLayerService,
            container: AttributeContainer.current,
        });
        return () => {
            if (AttributeContainer.current) {
                featureTable.destroy();
                AttributeContainer.current = null;
            }
        };
    }, [view]);
    return (
        <div
            className="w-full h-full overflow-auto py-2"
            ref={AttributeContainer}
        ></div>
    );
};

export default AttributeTableContent;
