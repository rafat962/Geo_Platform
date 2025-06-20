import React from "react";
import { useMap } from "../../../../shared/hooks/useMap";
import useView from "../../../../shared/hooks/useView";
import { billboards } from "../../helpers/billboard.StaticData";

const AddReq = () => {
    const { viewRef } = useMap(null);
    useView(viewRef, 11, [39.22, 21.45], "satellite", billboards);
    return <div>B7bek ya Salah Ya mgnooooon</div>;
};

export default AddReq;
