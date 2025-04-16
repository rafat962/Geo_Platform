import React, { useState } from "react";
import { HiArrowsPointingIn, HiArrowsPointingOut } from "react-icons/hi2";
const Expand = () => {
    const [expand, setExpand] = useState(false);
    function handleClick() {
        const el = document.documentElement;
        if (expand) {
            document.exitFullscreen();
        } else {
            el.requestFullscreen();
        }
        setExpand((state) => !state);
    }
    return (
        <div className="cursor-pointer " onClick={handleClick}>
            {!expand && (
                <HiArrowsPointingOut className="text-2xl hover:scale-105 trans dark:text-white" />
            )}
            {expand && (
                <HiArrowsPointingIn className="text-2xl hover:scale-95 trans dark:text-white" />
            )}
        </div>
    );
};

export default Expand;
