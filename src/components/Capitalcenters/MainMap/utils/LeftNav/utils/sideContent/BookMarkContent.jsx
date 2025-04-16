import React, { useEffect, useRef } from "react";
import { useNavContext } from "../../../../context/NavContext";
import Bookmarks from "@arcgis/core/widgets/Bookmarks.js";
import FeatureForm from "@arcgis/core/widgets/FeatureForm.js";
const BookMarkContent = () => {
    const BookmarkContainer = useRef();
    const { state } = useNavContext();
    const { view } = state;
    useEffect(() => {
        if (!view || !BookmarkContainer.current) return;
        const bookMark = new Bookmarks({
            view,
            container: BookmarkContainer.current,
            editingEnabled: true, // ✅ Allow users to create bookmarks
        });
        return () => {
            if (BookmarkContainer.current) {
                bookMark.destroy();
                BookmarkContainer.current = null;
            }
        };
    }, [view]);
    return (
        <div
            className="w-full h-full overflow-auto"
            ref={BookmarkContainer}
        ></div>
    );
};

export default BookMarkContent;
