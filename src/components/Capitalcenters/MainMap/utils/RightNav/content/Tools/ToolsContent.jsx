import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavContext } from "../../../../context/NavContext";
import { HiOutlineCheck } from "react-icons/hi2";
import addLineMeasure from "./hooks/addDistanceMeasure";
import addAreaMeasure from "./hooks/addAreaMeasure";
import addSearch from "./hooks/addSearch";
import addLocation from "./hooks/addLocation";
const ToolsContent = ({ handleClose, anchorEl, open, state, dispatch }) => {
    const { MeasureDistance, MeasureArea, search, location } = state;
    const {
        state: { view },
    } = useNavContext();
    // ----------- Measure Distance -----------
    addLineMeasure(view, MeasureDistance);
    // ----------- Measure Area -----------
    addAreaMeasure(view, MeasureArea);
    // ----------- search -----------
    addSearch(view, search);
    // ----------- location -----------
    addLocation(view, location);
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
        >
            <MenuItem
                onClick={() => {
                    dispatch({ type: "MeasureDistance" });
                }}
                className="flex items-center justify-center space-x-2"
            >
                <p>measurement Distance</p>
                {MeasureDistance && <HiOutlineCheck />}
            </MenuItem>
            <MenuItem
                onClick={() => {
                    dispatch({ type: "MeasureArea" });
                }}
                className="flex items-center justify-center space-x-2"
            >
                <p>measurement Area</p>
                {MeasureArea && <HiOutlineCheck />}
            </MenuItem>
            <MenuItem
                onClick={() => {
                    dispatch({ type: "search" });
                }}
                className="flex items-center justify-center space-x-2"
            >
                <p>Search</p>
                {search && <HiOutlineCheck />}
            </MenuItem>
            <MenuItem
                onClick={() => {
                    dispatch({ type: "location" });
                }}
                className="flex items-center justify-center space-x-2"
            >
                <p>Location</p>
                {location && <HiOutlineCheck />}
            </MenuItem>
        </Menu>
    );
};

export default ToolsContent;
