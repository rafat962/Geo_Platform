import React from "react";
import { useMap } from "../../../../shared/hooks/useMap";
import useView from "../../../../shared/hooks/useView";
import { billboards } from "../../helpers/billboard.StaticData";

const AddReq = () => {
    const { viewRef } = useMap(null);
    useView(viewRef, 11, [39.22, 21.45], "satellite", billboards);
return (
    <div className="w-full h-full bg-orange-400 dark:bg-red-950 text-4xl font-bold font-sans font-white flex py-2 my-0.5 border-2 pl-3 border-amber-950  justify-center">i will start tomorrow isA</div>
)
};
export default AddReq;
