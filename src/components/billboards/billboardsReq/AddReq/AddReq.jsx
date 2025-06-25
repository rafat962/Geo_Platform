import React from "react";
import { useMap } from "../../../../shared/hooks/useMap";
import useView from "../../../../shared/hooks/useView";
import { billboards } from "../../helpers/billboard.StaticData";

const AddReq = () => {
    const { viewRef } = useMap(null);
    useView(viewRef, 11, [39.22, 21.45], "satellite", billboards);
    return <div ref={viewRef} className="w-400 h-100 flex justify-center align-top pl-20 block " >
            <div className="w-250 h-565 p-20 m-20 bg-amber-400 block">
                asasd
            </div>
    </div>;
};

export default AddReq;
