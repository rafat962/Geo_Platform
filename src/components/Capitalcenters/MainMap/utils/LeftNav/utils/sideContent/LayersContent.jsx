import React, { useEffect, useRef } from "react";
import LayerList from "@arcgis/core/widgets/LayerList";
import { useNavContext } from "../../../../context/NavContext";
import toast from "react-hot-toast";
const LayersContent = () => {
    const LayerContainer = useRef();
    const { state, dispatch } = useNavContext();
    const { view } = state;
    useEffect(() => {
        if (!view || !LayerContainer.current) return;
        const LayersWidget = new LayerList({
            view: view,
            container: LayerContainer.current,
            listItemCreatedFunction: (event) => {
                const item = event.item;
                // Show legend when expanded
                item.panel = {
                    content: "legend",
                    open: false,
                };
                // Add custom actions
                item.actionsOpen = false;
                item.actionsSections = [
                    [
                        {
                            title: "Select",
                            className: "esri-icon-checkbox-checked",
                            id: "Select",
                        },
                        {
                            title: "Zoom to Layer",
                            className: "esri-icon-zoom-in-magnifying-glass",
                            id: "zoom-to-layer",
                        },
                        {
                            title: "Increase Opacity",
                            className: "esri-icon-up",
                            id: "increase-opacity",
                        },
                        {
                            title: "Decrease Opacity",
                            className: "esri-icon-down",
                            id: "decrease-opacity",
                        },
                        {
                            title: "Move Layer Up",
                            className: "esri-icon-arrow-up",
                            id: "move-layer-up",
                        },
                        {
                            title: "Move Layer Down",
                            className: "esri-icon-arrow-down",
                            id: "move-layer-down",
                        },

                        {
                            title: "Remove Layer",
                            className: "esri-icon-trash",
                            id: "Remove",
                        },
                    ],
                ];
            },
        });
        // Handle custom actions
        LayersWidget.on("trigger-action", (event) => {
            const layer = event.item.layer;
            switch (event.action.id) {
                case "Select":
                    selectLayer(layer);
                    break;
                case "zoom-to-layer":
                    if (layer.fullExtent) {
                        view.goTo(layer.fullExtent);
                    }
                    break;
                case "increase-opacity":
                    layer.opacity = Math.min(layer.opacity + 0.1, 1);
                    break;
                case "decrease-opacity":
                    layer.opacity = Math.max(layer.opacity - 0.1, 0);
                    break;
                case "move-layer-up":
                    moveLayerUp(layer);
                    break;
                case "move-layer-down":
                    moveLayerDown(layer);
                    break;
                case "Remove":
                    removeLayer(layer);
                    break;
                default:
                    break;
            }
        });
        // Move the layer up
        const moveLayerDown = (layer) => {
            const index = view.map.layers.indexOf(layer);
            if (index > 0) {
                view.map.reorder(layer, index - 1);
            }
        };
        // Move the layer down
        const moveLayerUp = (layer) => {
            const index = view.map.layers.indexOf(layer);
            if (index < view.map.layers.length - 1) {
                view.map.reorder(layer, index + 1);
            }
        };
        const selectLayer = (layer) => {
            dispatch({
                type: "selectLayer",
                payload: { selectedLayer: layer },
            });
            toast.success(`Layer ${layer.title} has been Selected.`);
        };
        const removeLayer = (layer) => {
            view?.map.remove(layer);
            toast.success(`Layer ${layer.title} has been removed.`);
        };
        return () => {
            if (LayerContainer.current) {
                LayersWidget.destroy();
                LayerContainer.current = null;
            }
        };
    }, [view]);
    return (
        <div
            className="w-full h-full  overflow-auto py-4"
            ref={LayerContainer}
        ></div>
    );
};

export default LayersContent;
