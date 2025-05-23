import React from "react";
import { useMap } from "../../shared/hooks/useMap";
import styles from "./LandUses.module.css";
const LandUses = () => {
    const { viewRef } = useMap();
    return (
        <div className="w-full h-full ">
            <div
                ref={viewRef}
                className={`w-full h-full ${styles.bgred}`}
            ></div>
        </div>
    );
};

export default LandUses;
