import Search from "@arcgis/core/widgets/Search";

let SearchWidget = null; // Keep a persistent reference

const addSearch = (view, search) => {
    if (search) {
        if (!SearchWidget) {
            SearchWidget = new Search({
                view: view,
                id: "Search",
            });
            view.ui.add(SearchWidget, {
                position: "top-right",
            });
        }
    } else {
        if (SearchWidget) {
            view.ui.remove(SearchWidget); // Remove widget from UI
            SearchWidget.destroy(); // Destroy widget to free memory
            SearchWidget = null; // Reset reference
        }
    }
};

export default addSearch;
