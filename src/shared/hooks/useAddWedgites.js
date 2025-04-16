import Compass from "@arcgis/core/widgets/Compass";
import LayerList from "@arcgis/core/widgets/LayerList";
import Legend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand";
import Home from "@arcgis/core/widgets/Home";
function useAddWedgites(view) {
    // --------------- widgets ---------------
    let CompassWidget = new Compass({
        view: view,
        id: "Compass",
    });
    let LayersWidget = new LayerList({
        view: view,
        id: "Layers",
    });
    const layersExpand = new Expand({
        view: view,
        content: LayersWidget,
        expanded: false, // set true if you want it open by default
        group: "top-right", // optional: helps group multiple expand widgets
    });
    let LegendWidget = new Legend({
        view: view,
        id: "Legend",
    });
    const LegendExpand = new Expand({
        view: view,
        content: LegendWidget,
        expanded: false,
    });
    const homeWidget = new Home({
        view,
    });
    // Add the home widget to the UI
    view.ui.add(homeWidget, {
        position: "top-left",
    });
    view.ui.add(LegendExpand, {
        position: "bottom-right",
    });
    view.ui.add(layersExpand, {
        position: "bottom-left",
    });
    view.ui.add(CompassWidget, {
        position: "top-left",
    });
}

export default useAddWedgites;
