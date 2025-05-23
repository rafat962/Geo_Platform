import React from "react";
import { useMap } from "../../shared/hooks/useMap";

const LandUses = () => {
    const { viewRef } = useMap();
    return (
        <div className="w-full h-full ">
            asd
            <div ref={viewRef} className="w-full h-full"></div>
        </div>
    );
};

export default LandUses;
