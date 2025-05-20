/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useGetPendingUsers } from "../hooks/useSettings";
import { Button } from "@mui/material";
import { acceptPendingEmail, rejectUser } from "../helpers/settings.apis";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
const RequerstedEmails = () => {
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    let [emails, setEmails] = useState([]);
    const { isLoading, PendingUser, error } = useGetPendingUsers();
    useEffect(() => {
        setEmails(PendingUser);
    }, [PendingUser]);
    // handle accept email
    async function handleAcceptEmail(id) {
        const res = await acceptPendingEmail(id);
        toast.success(res.message);
    }
    // handle delete email
    async function handleDeleteEmail(id) {
        const res = await rejectUser(id);
        toast.success(res?.message || "success");
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-start py-8 overflow-auto font-sec">
            <div className="w-full h-full flex flex-col items-center space-y-8">
                {/* Sum */}
                <div className="flex items-center justify-center space-x-2 outline-2 outline-gray-600 rounded-full px-6 py-2">
                    <p className="text-lg font-semibold">{emails?.length}</p>
                    <h1 className="text-xl font-semibold">
                        {t("إجمالى عدد الإيميلات المطلوبة")}
                    </h1>
                </div>
                {/* body */}
                <div className="w-full h-full flex flex-col items-center justify-start space-y-6 px-6">
                    {emails?.map((item) => (
                        <div
                            key={item.id}
                            className={`flex ${!isRTL && "flex-row-reverse"} justify-between items-center py-2 px-8 w-full outline-2 outline-gray-500 rounded-3xl hover:bg-gray-200 trans`}
                        >
                            {/* actions */}
                            <div
                                className={`flex ${!isRTL && "flex-row-reverse "} items-center justify-center space-x-4`}
                            >
                                <Button
                                    onClick={() => handleAcceptEmail(item._id)}
                                    variant="contained"
                                    sx={{
                                        margin: "0px 8px 0px 0px",
                                    }}
                                >
                                    {t("موافقة")}
                                </Button>
                                <Button
                                    onClick={() => handleDeleteEmail(item._id)}
                                    variant="contained"
                                    color="error"
                                >
                                    {t("رفض")}
                                </Button>
                            </div>
                            {/* data */}
                            <div
                                className={`flex ${isRTL ? "items-end" : "items-start "} flex-col justify-start`}
                            >
                                <h1
                                    className={`flex ${isRTL ? "items-center" : "flex-row-reverse items-center"}  space-x-2`}
                                >
                                    <span className="font-semibold">
                                        {item.name}
                                    </span>
                                    {isRTL ? (
                                        <span
                                            className={`text-xl ${!isRTL && "mr-1"}`}
                                        >
                                            :{t("الإسم")}
                                        </span>
                                    ) : (
                                        <span
                                            className={`text-xl ${!isRTL && "mr-1"}`}
                                        >
                                            {t("الإسم")}:
                                        </span>
                                    )}
                                </h1>
                                <h1
                                    className={`flex ${isRTL ? "items-center" : "flex-row-reverse items-center"}  space-x-2`}
                                >
                                    <span className="font-semibold">
                                        {item.email}
                                    </span>{" "}
                                    {isRTL ? (
                                        <span
                                            className={`text-xl ${!isRTL && "mr-1"}`}
                                        >
                                            :{t("الحساب")}
                                        </span>
                                    ) : (
                                        <span
                                            className={`text-xl ${!isRTL && "mr-1"}`}
                                        >
                                            {t("الحساب")}:
                                        </span>
                                    )}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RequerstedEmails;
