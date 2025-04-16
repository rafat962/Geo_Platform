import React, { useEffect, useRef } from "react";
import Legend from "@arcgis/core/widgets/Legend";
import { useNavContext } from "../../../../context/NavContext";

const LegendContent = () => {
    const LegendContainer = useRef();
    const legendRef = useRef(null);
    const { state } = useNavContext();
    const { view } = state;

    useEffect(() => {
        if (view && LegendContainer.current && !legendRef.current) {
            legendRef.current = new Legend({
                view,
                container: LegendContainer.current,
            });
        }

        return () => {
            // Optional: only destroy if you know view will change
            if (legendRef.current) {
                legendRef.current.destroy();
                legendRef.current = null;
            }
        };
    }, [view]);

    return (
        <div
            className="w-full h-full overflow-auto"
            ref={LegendContainer}
        ></div>
    );
};

export default LegendContent;
