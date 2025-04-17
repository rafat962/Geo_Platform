import React from "react";
import NavItem from "../LeftNav/utils/NavItem";
import { useRightNavContext } from "../../context/RightNavContext";
import { Tooltip } from "@mui/material";
import {
    HiMiniArrowUturnUp,
    HiMiniCubeTransparent,
    HiMiniTableCells,
    HiMiniWrenchScrewdriver,
    HiOutlineAtSymbol,
    HiPrinter,
} from "react-icons/hi2";
import { BiEditAlt, BiTable } from "react-icons/bi";
import AttributeQueryContent from "./content/QueryByAttributes/AttributeQueryContent";
import LableContent from "./content/lable/LableContent";
import EditContent from "./content/Edit/EditContent";
import BufferContent from "./content/Buffer/BufferContent";
import RoutingContent from "./content/Routing/RoutingContent";
import AttributeTableContent from "./content/AttributeTable/AttributeTableContent";
import ToolsContent from "./content/Tools/ToolsContent";
import PrintContent from "./content/print/PrintContent";
const RightNav = ({ smallCase = false }) => {
    const { dispatch, state } = useRightNavContext();
    const {
        AttributeQuery,
        lable,
        Edit,
        Buffer,
        Routing,
        attribute,
        Print,
        Tools,
    } = state;
    // menu Logic
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        dispatch({ type: "Tools" });
    };
    const handleClose = () => {
        setAnchorEl(null);
        dispatch({ type: "Tools" });
    };
    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            {/* main container */}
            <ul className="w-full h-full flex flex-col items-center justify-start  py-2">
                {/* Query By Attributes */}
                <NavItem
                    smallCase={smallCase}
                    name="Query By Attributes"
                    icon={<BiTable />}
                    onClick={() => dispatch({ type: "AttributeQuery" })}
                    state={AttributeQuery}
                    content={<AttributeQueryContent />}
                    dispatch={dispatch}
                    dir="right"
                />
                {/* Lable */}
                <NavItem
                    smallCase={false}
                    name="Lable"
                    icon={<HiOutlineAtSymbol />}
                    onClick={() => dispatch({ type: "lable" })}
                    state={lable}
                    content={<LableContent />}
                    dispatch={dispatch}
                    dir="right"
                />
                {/* Edit */}
                <NavItem
                    smallCase={smallCase}
                    name="Edit"
                    icon={<BiEditAlt />}
                    onClick={() => dispatch({ type: "Edit" })}
                    state={Edit}
                    content={<EditContent />}
                    dispatch={dispatch}
                    dir="right"
                />
                {/* Buffer */}
                <NavItem
                    smallCase={smallCase}
                    name="Buffer"
                    icon={<HiMiniCubeTransparent />}
                    onClick={() => dispatch({ type: "Buffer" })}
                    state={Buffer}
                    content={<BufferContent />}
                    dispatch={dispatch}
                    dir="right"
                />
                {/* Routing */}
                <NavItem
                    smallCase={smallCase}
                    name="Routing"
                    icon={<HiMiniArrowUturnUp />}
                    onClick={() => dispatch({ type: "Routing" })}
                    state={Routing}
                    content={<RoutingContent />}
                    dispatch={dispatch}
                    dir="right"
                />
                {/* attribute */}
                <NavItem
                    smallCase={smallCase}
                    name="Attribute Table"
                    icon={<HiMiniTableCells />}
                    onClick={() => dispatch({ type: "attribute" })}
                    state={attribute}
                    content={<AttributeTableContent />}
                    dispatch={dispatch}
                    dir="right"
                    Vdir="hor"
                />
                {/*  Tools  */}
                <Tooltip title={"Tools"} placement="right" arrow>
                    <li
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        className={`${Tools && "bg-black  text-white"} flex justify-center items-center text-xl w-full py-4 px-3 cursor-pointer text-gray-400 hover:text-white hover:bg-black  hover:backdrop-opacity-40 trans`}
                    >
                        <HiMiniWrenchScrewdriver />
                    </li>
                </Tooltip>
                {/* Print */}
                <NavItem
                    smallCase={smallCase}
                    name="Print"
                    icon={<HiPrinter />}
                    onClick={() => dispatch({ type: "Print" })}
                    state={Print}
                    content={<PrintContent />}
                    dispatch={dispatch}
                    dir="right"
                />
                {/* menu */}
                <ToolsContent
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    open={open}
                    dispatch={dispatch}
                    state={state}
                />
            </ul>
        </div>
    );
};

export default RightNav;
