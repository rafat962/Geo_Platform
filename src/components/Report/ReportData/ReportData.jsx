/* eslint-disable no-unused-vars */
import React, { act, useReducer, useRef } from "react";
import Checkbox from "../../../shared/ui/Checkbox";
import {
    BuildingStateFN,
    matrialDomainFN,
} from "../../Capitalcenters/shared/helpers/CentralCodeToDomain";
import { useTableData } from "../../Capitalcenters/AllCenters/hooks/useTableData";
import Loader from "../../../shared/ui/Loader";
import { ButtonA } from "../../../shared/ui/ButtonA";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const initState = {
    LandUse: false,
    HEIGHT: false,
    STATUS_AR: false,
    MATERIALNAME_AR: false,
    OBJECTID: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "LandUse":
            return {
                ...state,
                LandUse: !state.LandUse,
            };
        case "HEIGHT":
            return {
                ...state,
                HEIGHT: !state.HEIGHT,
            };
        case "STATUS_AR":
            return {
                ...state,
                STATUS_AR: !state.STATUS_AR,
            };
        case "MATERIALNAME_AR":
            return {
                ...state,
                MATERIALNAME_AR: !state.MATERIALNAME_AR,
            };
        case "OBJECTID":
            return {
                ...state,
                OBJECTID: !state.OBJECTID,
            };
    }
}

const ReportData = () => {
    // Translation
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // ---
    const [state, dispatch] = useReducer(reducer, initState);
    const { LandUse, HEIGHT, STATUS_AR, MATERIALNAME_AR, OBJECTID } = state;
    // fun to handle dispatch
    const handleDispatch = (type) => {
        dispatch({ type });
    };
    // get buildings Data
    const { isLoading, buildingsData, error } = useTableData();
    const tableRef = useRef();
    if (isLoading) {
        return <Loader />;
    }
    // print
    const handlePrint = () => {
        const printContent = tableRef.current.innerHTML;
        const printWindow = window.open("", "", "width=1000,height=600");
        printWindow.document.write(`
            <html dir="rtl">
                <head>
                    <title>طباعة التقرير</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            direction: ${isRTL ? "rtl" : "ltr"};
                        }
                        th, td {
                            border: 1px solid #ccc;
                            padding: 8px;
                            text-align: right;
                        }
                        thead {
                            background-color: #f0f0f0;
                        }
                    </style>
                </head>
                <body>${printContent}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div
                dir={isRTL ? "rtl" : "ltr"}
                className="w-full h-full flex flex-wrap items-center justify-start"
            >
                <Checkbox
                    state={OBJECTID}
                    onClick={() => handleDispatch("OBJECTID")}
                    lable={t("كود المبنى")}
                />
                <Checkbox
                    state={LandUse}
                    onClick={() => handleDispatch("LandUse")}
                    lable={t("إستعمال المبنى")}
                />
                <Checkbox
                    state={HEIGHT}
                    onClick={() => handleDispatch("HEIGHT")}
                    lable={t("إرتفاع المبنى")}
                />
                <Checkbox
                    state={STATUS_AR}
                    onClick={() => handleDispatch("STATUS_AR")}
                    lable={t("حالة البناء")}
                />
                <Checkbox
                    state={MATERIALNAME_AR}
                    onClick={() => handleDispatch("MATERIALNAME_AR")}
                    lable={t("خامة البناء")}
                />
                {/* Print */}
                <button
                    onClick={handlePrint}
                    className=" w-fit px-4 py-1 mb-4 rounded-full bg-blue-600 text-white cursor-pointer hover:bg-blue-500  trans hover:-translate-y-0.5"
                >
                    {t("طباعة")}
                </button>
            </div>
            {/* table */}
            <div ref={tableRef} class="relative overflow-x-auto w-full">
                <table
                    dir={isRTL ? "rtl" : "ltr"}
                    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {OBJECTID && (
                                <th scope="col" class="px-6 py-3">
                                    {t("كود المبنى")}
                                </th>
                            )}
                            {LandUse && (
                                <th scope="col" class="px-6 py-3">
                                    {t("إستعمال المبنى")}
                                </th>
                            )}
                            {HEIGHT && (
                                <th scope="col" class="px-6 py-3">
                                    {t("الإرتفاع")}
                                </th>
                            )}
                            {STATUS_AR && (
                                <th scope="col" class="px-6 py-3">
                                    {t("حالة المبنى")}
                                </th>
                            )}
                            {MATERIALNAME_AR && (
                                <th scope="col" class="px-6 py-3">
                                    {t("خامة البناء")}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {buildingsData.map((item) => {
                            return (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    {OBJECTID && (
                                        <td class="px-6 py-4">
                                            {item.attributes.OBJECTID}
                                        </td>
                                    )}
                                    {LandUse && (
                                        <td class="px-6 py-4">
                                            {item.attributes.LandUse}
                                        </td>
                                    )}
                                    {HEIGHT && (
                                        <td class="px-6 py-4">
                                            {item.attributes.HEIGHT}
                                        </td>
                                    )}
                                    {STATUS_AR && (
                                        <td class="px-6 py-4">
                                            {BuildingStateFN(
                                                item.attributes.STATUS_AR
                                            )}
                                        </td>
                                    )}
                                    {MATERIALNAME_AR && (
                                        <td class="px-6 py-4">
                                            {matrialDomainFN(
                                                item.attributes.MATERIALNAME_AR
                                            )}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportData;
