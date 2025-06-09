/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Report = () => {
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
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
                            {t("التقارير")}
                        </h1>
                        <p>{t("تحكم في بيانات التقارير الخاصة")}</p>
                    </div>
                    {/* body */}
                    <div className="w-full h-full p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Report;
