/* eslint-disable no-unused-vars */
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useSelector } from "react-redux";

const Settings = () => {
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    const { role } = useSelector((state) => state.authorization);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full h-full px-8 p-8">
                {/* main container */}
                <div
                    className={`w-full h-full flex flex-col ${isRTL ? "items-end" : "items-start"} justify-start`}
                >
                    {/* head */}
                    <div
                        className={`flex flex-col ${isRTL ? "items-end" : "items-start"} justify-center space-y-3`}
                    >
                        <h1 className="font-semibold text-3xl">
                            {t("الإعدادات")}
                        </h1>
                        <p>{t("تحكم في إعداداتك الخاصة")}</p>
                        {/* Chips */}
                        <Stack direction="row" spacing={1}>
                            {role === "admin" && (
                                <NavLink
                                    
                                    to="existingEmails"
                                >
                                    {({ isActive }) => (
                                        <Chip
                                            label={t("الحسابات الحالية")}
                                            variant={
                                                isActive ? "filled" : "outlined"
                                            }
                                            color={
                                                isActive ? "primary" : "default"
                                            }
                                        />
                                    )}
                                </NavLink>
                            )}
                            {role === "admin" && (
                                <NavLink to="requestedEmails">
                                    {({ isActive }) => (
                                        <Chip
                                            label={t("الحسابات المطلوبة")}
                                            variant={
                                                isActive ? "filled" : "outlined"
                                            }
                                            color={
                                                isActive ? "primary" : "default"
                                            }
                                        />
                                    )}
                                </NavLink>
                            )}

                            <NavLink to="email">
                                {({ isActive }) => (
                                    <Chip
                                        label={t("الإيميل")}
                                        variant={
                                            isActive ? "filled" : "outlined"
                                        }
                                        color={isActive ? "primary" : "default"}
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
        </motion.div>
    );
};

export default Settings;
