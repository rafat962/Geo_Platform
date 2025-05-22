/* eslint-disable no-unused-vars */
import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { BiDetail } from "react-icons/bi";
import { useAstsContext } from "../context/AssetsContext";
import DeleteDialog from "./actions/DeleteDialog";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
const options = [
    { id: 0, name: "مشاهدة البيانات", icon: <BiDetail /> },
    { id: 1, name: "تحديث الأصل", icon: <HiOutlinePencil /> },
];

const MenuToggle = ({ item }) => {
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    const { dispatch } = useAstsContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (option) => {
        if (option.id === 0) dispatch({ type: "details", payload: item });
        if (option.id === 1) dispatch({ type: "updateItem", payload: item });
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.id}
                        onClick={() => handleClose(option)}
                    >
                        <div className="flex items-center justify-start space-x-2 ">
                            <p className={`${isRTL ? "w-19" : "w-full"}`}>
                                {t(option.name)}
                            </p>
                            <span>{option.icon}</span>
                        </div>
                    </MenuItem>
                ))}
                <DeleteDialog item={item}>
                    <MenuItem key={2}>
                        <div className="flex items-center justify-start space-x-2 ">
                            <p className="w-19">{t("حذف الأصل")}</p>
                            <span>
                                <HiOutlineTrash />
                            </span>
                        </div>
                    </MenuItem>
                </DeleteDialog>
            </Menu>
        </div>
    );
};

export default MenuToggle;
