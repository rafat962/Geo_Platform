import React, { useEffect, useRef } from "react";
import Editor from "@arcgis/core/widgets/Editor.js";
import { useNavContext } from "../../../../context/NavContext";
const EditContent = () => {
    const EditContainer = useRef();
    const { state } = useNavContext();
    const { view } = state;
    useEffect(() => {
        if (!view || !EditContainer.current) return;
        const basemapGallery = new Editor({
            view: view,
            container: EditContainer.current,
        });
        return () => {
            if (EditContainer.current) {
                basemapGallery.destroy();
                EditContainer.current = null;
            }
        };
    }, [view]);
    return (
        <div
            className="w-full h-full overflow-auto py-2"
            ref={EditContainer}
        ></div>
    );
};

export default EditContent;
