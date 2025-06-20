import { billboards } from "../../helpers/billboard.StaticData";
import { useMap } from "../../../../shared/hooks/useMap";
import useView from "../../../../shared/hooks/useView";
import { memo } from "react";

const Map = memo(() => {
    const { viewRef } = useMap(null);
    useView(viewRef, 11, [39.22, 21.45], "satellite", billboards);
    return (
        <div
            ref={viewRef}
            className="w-full h-full rounded-2xl overflow-hidden"
        ></div>
    );
});

export default Map;
