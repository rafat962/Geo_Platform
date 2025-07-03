import {
    billboard_Contracts,
    billboards,
} from "../../helpers/billboard.StaticData";
import { useMap } from "../../../../shared/hooks/useMap";
import useView from "../../../../shared/hooks/useView";
import { memo } from "react";

const Map = memo(({ setView }) => {
    const { viewRef } = useMap(null);
    const { view, map } = useView(
        viewRef,
        11,
        [39.22, 21.45],
        "satellite",
        billboards
    );
    map.tables.add(billboard_Contracts);
    setView(view);
    return (
        <div
            ref={viewRef}
            className="w-full h-full rounded-2xl overflow-hidden"
        ></div>
    );
});

export default Map;
