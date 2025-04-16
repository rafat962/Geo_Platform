/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import useScrollToRecord from "../../hooks/useScrollToRecord";
import { Button, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
    BuildingStateDomain,
    matrialDomain,
    landUseDomain,
    formFields,
} from "../../../shared/helpers/CentralCodeToDomain";
import { PointsLayerService } from "../../../../../shared/static/StaticMapData";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { DataConvert } from "../../../../../shared/helpers/DateConvintion";
import { motion } from "framer-motion";
const AssetUpdate = memo(({ data, dispatch, view }) => {
    const [open, setOpen] = React.useState(false); // for backdrop
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const attr = data.attributes;
    const handleBack = () => {
        useScrollToRecord(null, view, "end");
        dispatch({ type: "endUpdate" });
    };
    // get only needed atr
    function filterFormFields(attr, formFields) {
        const allowedFields = formFields.map((f) => f.fieldName); // Get all field names from formFields
        // Filter attr to include only the keys that are in allowedFields
        const filteredAttr = Object.fromEntries(
            Object.entries(attr).filter(([key]) => allowedFields.includes(key))
        );

        // Format the date fields if they are present in filteredAttr
        if (filteredAttr.START_DATE) {
            filteredAttr.START_DATE = DataConvert(filteredAttr.START_DATE); // Format START_DATE
        }

        return filteredAttr;
    }

    // form init
    const { control, handleSubmit } = useForm({
        defaultValues: {
            MATERIALNAME_AR: attr.MATERIALNAME_AR,
            STATUS_AR: attr.STATUS_AR,
            LandUse: attr.LandUse,
            ...filterFormFields(attr, formFields),
        },
    });
    // submit
    const query = useQueryClient();
    function onSubmit(data) {
        setOpen(true);
        const updatedFeature = {
            attributes: {
                OBJECTID: attr.OBJECTID,
                ...data,
            },
        };

        PointsLayerService.applyEdits({
            updateFeatures: [updatedFeature],
        })
            .then(() => {
                query.invalidateQueries(["buildingsData"]);
                toast.success("تم تحديث الأصل بنجاح");
                handleBack();
                setOpen(false);
            })
            .catch((err) => {
                toast.error(err.message);
                setOpen(false);
            });
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* header */}
            <div className="w-full flex items-center justify-between px-2">
                {/* backButton */}
                <span
                    onClick={handleBack}
                    className="text-2xl cursor-pointer hover:text-blue-800 hover:-translate-x-0.5 hover:drop-shadow-2xl trans"
                >
                    <HiArrowLeft />
                </span>
                {/* AssetName */}
                <span>
                    تحديث الأصل رقم{"  --  "}
                    <span className="text-blue-950 dark:text-red-500 font-semibold">
                        {attr.OBJECTID}
                    </span>
                </span>
            </div>
            {/* form */}
            <CacheProvider value={cacheRtl}>
                <form
                    className=" w-full h-fit grid grid-cols-2 gap-6 gap-y-7 p-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* All fields */}
                    {formFields.map((fieldItem) => (
                        <Controller
                            key={fieldItem.fieldName}
                            name={fieldItem.fieldName}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    value={field.value || ""} // Ensure value is never null
                                    {...field}
                                    className=" w-full text-right"
                                    id="standard-basic"
                                    type={fieldItem.type}
                                    label={fieldItem.lable}
                                    variant="standard"
                                    dir="rtl"
                                />
                            )}
                        />
                    ))}
                    {/* LandUse */}
                    <Controller
                        name="LandUse"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="إستعمال الأرض"
                                variant="standard"
                            >
                                {landUseDomain.map((item) => (
                                    <MenuItem
                                        dir="rtl"
                                        key={item.name}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    {/* MATERIALNAME_AR */}
                    <Controller
                        name="MATERIALNAME_AR"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="خامة البناء"
                                variant="standard"
                                dir="rtl"
                            >
                                {matrialDomain.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    {/* STATUS_AR */}
                    <Controller
                        name="STATUS_AR"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="حالة المبنى"
                                variant="standard"
                                dir="rtl"
                            >
                                {BuildingStateDomain.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Button
                        type="submit"
                        className=" col-span-2"
                        variant="contained"
                    >
                        <p className="text-lg">تعديل البيانات</p>
                    </Button>
                    <Backdrop
                        sx={(theme) => ({
                            color: "#fff",
                            zIndex: theme.zIndex.drawer + 1,
                        })}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </form>
            </CacheProvider>
        </motion.div>
    );
});

export default AssetUpdate;
