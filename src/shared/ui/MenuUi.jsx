/* eslint-disable no-unused-vars */
import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    HiMiniWrenchScrewdriver,
    HiOutlineCheck,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { BiDetail } from "react-icons/bi";
import DialogUi from "./DialogUi";
import {
    ActiviteUser,
    deActiviteUser,
    rejectUser,
} from "../../components/Settings/helpers/settings.apis";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useGetUserLogs } from "../../components/Settings/hooks/useSettings";
const options = [
    {
        id: 0,
        name: "مشاهدة السجل",
        message: "",
        icon: <BiDetail />,
        action: async (item) => {
            console.log(1);
        },
        preload: true,
    },
    {
        id: 1,
        name: "تفعيل الحساب",
        message: "سيتم تفعيل الحساب بصورة نهائية",
        icon: <HiOutlineCheck />,
        action: async (item) => {
            const res = await ActiviteUser(item);
            return res;
        },
        preload: false,
    },
    {
        id: 2,
        name: "إيقاف مؤقت",
        message:
            "هل تريد إيقاف الحساب بصورة مؤقتة ؟ يمكنك إعادة تنشيط الحساب في وقت لاحق",
        icon: <HiOutlineWrenchScrewdriver />,
        action: async (item) => {
            const res = await deActiviteUser(item);
            return res;
        },
        preload: false,
    },
    {
        id: 3,
        name: "إيقاف نهائى",
        message:
            "هل تريد إيقاف الحساب بصورة نهائية ؟ في حالة الإيقاف يتم حذف الحساب",
        icon: <HiOutlineTrash />,
        action: async (item) => {
            const res = await rejectUser(item);
            return res;
        },
        preload: false,
    },
];

const MenuUi = ({ item }) => {
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // return { isSuccess, UserLogs, error };
    };
    const handleClose = (option) => {
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
                    <DialogUi
                        content={
                            <MenuItem key={option.id}>
                                <div className="flex items-center justify-start space-x-2 ">
                                    <p className="w-fit">{t(option.name)}</p>
                                    <span>{option.icon}</span>
                                </div>
                            </MenuItem>
                        }
                        handleCloseMenu={handleClose}
                        action={() => option.action(item)}
                        actionName={t(option.name)}
                        successMessage="done"
                        message={option.message}
                        preload={option.preload}
                        item={item}
                    />
                ))}
            </Menu>
        </div>
    );
};

export default MenuUi;
