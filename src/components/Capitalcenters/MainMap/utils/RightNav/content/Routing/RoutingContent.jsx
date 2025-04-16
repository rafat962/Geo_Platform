import React, { useEffect, useRef } from "react";
import { useNavContext } from "../../../../context/NavContext";
import Directions from "@arcgis/core/widgets/Directions.js";
import RouteLayer from "@arcgis/core/layers/RouteLayer.js";
import esriConfig from "@arcgis/core/config.js";

const RoutingContent = () => {
    const RoutingContainer = useRef();
    const { state } = useNavContext();
    const { view } = state;
    useEffect(() => {
        if (!view || !RoutingContainer.current) return;
        esriConfig.apiKey = JSON.parse(localStorage.getItem("LayerToken"));
        const routeLayer = new RouteLayer();
        const directionsWidget = new Directions({
            view: view,
            layer: routeLayer,
            container: RoutingContainer.current,
        });
        view.map.add(routeLayer);
        return () => {
            if (RoutingContainer.current) {
                directionsWidget.destroy();
                RoutingContainer.current = null;
            }
        };
    }, [view]);
    return (
        <div
            className="w-full h-full overflow-auto py-2"
            ref={RoutingContainer}
        ></div>
    );
};

export default RoutingContent;
