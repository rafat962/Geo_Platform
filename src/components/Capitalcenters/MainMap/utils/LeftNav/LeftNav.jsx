import React from "react";
import {
    BiBookBookmark,
    BiCog,
    BiGridAlt,
    BiInfoCircle,
    BiLayer,
    BiListUl,
    BiShareAlt,
} from "react-icons/bi";
import { Tooltip } from "@mui/material";
import NavItem from "./utils/NavItem";
import { useNavContext } from "../../context/NavContext";
import LayersContent from "./utils/sideContent/LayersContent";
import BasemapContent from "./utils/sideContent/BasemapContent";
import LegendContent from "./utils/sideContent/LegendContent";
import BookMarkContent from "./utils/sideContent/BookMarkContent";
import ShareDialog from "./utils/sideContent/ShareDialog";
import Expand from "../../../../../shared/ui/header/utils/Expand";
import RightNav from "../RightNav/RightNav";
const LeftNav = () => {
    const { dispatch, state } = useNavContext();
    const { layers, BaseMap, legend, bookMark } = state;
    // ---- dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            {/* main container */}
            <ul className="w-full h-full flex flex-col items-center justify-start  py-2">
                {/* Layers */}
                <NavItem
                    name="Layers"
                    icon={<BiLayer />}
                    onClick={() => dispatch({ type: "layers" })}
                    state={layers}
                    content={<LayersContent />}
                    dispatch={dispatch}
                />
                {/* Basemap */}
                <NavItem
                    name="BaseMap"
                    icon={<BiGridAlt />}
                    onClick={() => dispatch({ type: "BaseMap" })}
                    state={BaseMap}
                    content={<BasemapContent />}
                    dispatch={dispatch}
                />
                {/* Legend */}
                <NavItem
                    name="Legend"
                    icon={<BiListUl />}
                    onClick={() => dispatch({ type: "legend" })}
                    state={legend}
                    content={<LegendContent />}
                    dispatch={dispatch}
                />
                {/* BookMark */}
                <NavItem
                    name="BookMark"
                    icon={<BiBookBookmark />}
                    onClick={() => dispatch({ type: "bookMark" })}
                    state={bookMark}
                    content={<BookMarkContent />}
                    dispatch={dispatch}
                />
                {/* Share */}
                <NavItem
                    onClick={handleClickOpen}
                    name="Share"
                    icon={<BiShareAlt />}
                    state={false}
                />
                {/* share Dialog */}
                <ShareDialog open={open} handleClose={handleClose} />
                {/* righ nav in small screen */}
                <div className="md:hidden">
                    <RightNav smallCase={true} />
                </div>
            </ul>
            {/* bottom */}
            <ul className="w-full  flex flex-col items-center justify-start  pb-2">
                {/* expand */}
                <Tooltip title="Expand" placement="right" arrow>
                    <li
                        className={` flex justify-center items-center text-xl w-full py-4 px-3 cursor-pointer text-gray-400 hover:text-white hover:bg-black  hover:backdrop-opacity-40 trans`}
                    >
                        <Expand />
                    </li>
                </Tooltip>
                {/* Layers */}
                <NavItem name="Info" icon={<BiInfoCircle />} state={false} />
                {/* Basemap */}
                <NavItem name="Settings" icon={<BiCog />} state={false} />
            </ul>
        </div>
    );
};

export default LeftNav;
