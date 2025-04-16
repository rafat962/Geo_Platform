import { memo } from "react";

const Map = ({viewRef}) => {

    return <div ref={viewRef} className="w-full h-full"></div>;
};

export default memo(Map) ;
