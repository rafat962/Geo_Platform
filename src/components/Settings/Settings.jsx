import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { NavLink, Outlet } from "react-router-dom";
import { HiCheck } from "react-icons/hi2";
const Settings = () => {
    const handleClick = () => {
        console.info("You clicked the Chip.");
    };

    return (
        <div className="  w-full h-full px-8 p-8">
            {/* main container */}
            <div className="w-full h-full flex flex-col items-end justify-start">
                {/* head */}
                <div className="flex flex-col items-end justify-center space-y-3">
                    <h1 className="font-semibold text-3xl">الإعدادات</h1>
                    <p>تحكم في إعداداتك الخاصة</p>
                    {/* Chips */}
                    <Stack direction="row" spacing={1}>
                        <NavLink to="/settings">
                            {({ isActive }) => (
                                <Chip
                                    label="مشاركة"
                                    variant={isActive ? "filled" : "outlined"}
                                    color={isActive ? "primary" : "default"}
                                    onClick={handleClick}
                                    icon={isActive ? <HiCheck /> : ""}
                                />
                            )}
                        </NavLink>
                        <NavLink to="/settings">
                            {({ isActive }) => (
                                <Chip
                                    label="الإيميلات المطلوبة"
                                    variant={isActive ? "filled" : "outlined"}
                                    color={isActive ? "primary" : "default"}
                                    onClick={handleClick}
                                    icon={isActive ? <HiCheck /> : ""}
                                />
                            )}
                        </NavLink>
                        <NavLink to="/settings">
                            {({ isActive }) => (
                                <Chip
                                    label="الإشعارات"
                                    variant={isActive ? "filled" : "outlined"}
                                    color={isActive ? "primary" : "default"}
                                    onClick={handleClick}
                                    icon={isActive ? <HiCheck /> : ""}
                                />
                            )}
                        </NavLink>
                        <NavLink to="/settings/email">
                            {({ isActive }) => (
                                <Chip
                                    label="الإيميل"
                                    variant={isActive ? "filled" : "outlined"}
                                    color={isActive ? "primary" : "default"}
                                    onClick={handleClick}
                                    icon={isActive ? <HiCheck /> : ""}
                                />
                            )}
                        </NavLink>
                    </Stack>
                </div>
                {/* body */}
                <div className="w-full h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Settings;
