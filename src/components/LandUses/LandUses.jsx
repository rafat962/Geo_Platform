import React from "react";
import { useMap } from "../../shared/hooks/useMap";
import styles from "./LandUses.module.css";
import useView from "../../shared/hooks/useView";
import { PointsLayerService } from "../../shared/static/StaticMapData";
{
    /* <link rel="stylesheet" href="./LandUses.module.css" /> */
}
const LandUses = () => {
    const { viewRef } = useMap();
    useView(viewRef, 6, [43, 18.5], "satellite", PointsLayerService);
    return (
        <div className="w-full h-full ">
            <div className={styles.color}>Landuse Map</div>
            {/* <img src="imgs\WhatsApp Image 2025-05-15 at 15.34.50_a33ea2b6.jpg" alt="" /> */}
            <div ref={viewRef} className={`w-full h-full ${styles.map}`}></div>
            <div className={styles.div_table}>
                <table className={styles.table}>
                    <caption className={styles.caption}>landuse Table</caption>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Shape_length</th>
                            <th>Shape_area</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15</td>
                            <td>commercial</td>
                            <td>1500</td>
                            <td>184555</td>
                            <td>157152</td>
                        </tr>
                        <tr>
                            <td>04</td>
                            <td>religion</td>
                            <td>5987</td>
                            <td>648361</td>
                            <td>158485</td>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>residential</td>
                            <td>41545</td>
                            <td>5699841</td>
                            <td>14874</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>industrial</td>
                            <td>51515</td>
                            <td>184555</td>
                            <td>1571523</td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td>medical</td>
                            <td>7452554</td>
                            <td>697821</td>
                            <td>478745</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LandUses;
