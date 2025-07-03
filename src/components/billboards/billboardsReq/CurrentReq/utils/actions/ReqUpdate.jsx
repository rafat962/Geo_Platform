/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import useScrollToRecord from "../../hooks/useScrollToRecord";
import { Button, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { DataConvert } from "../../../../../../shared/helpers/DateConvintion";
import { motion } from "framer-motion";
import { billboards } from "../../../../helpers/billboard.StaticData";
const ReqUpdate = memo(({ data, dispatch, view }) => {
    const [open, setOpen] = React.useState(false); // for backdrop
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const attr = data.attributes;
    const handleBack = () => {
        useScrollToRecord(null, view, "end");
        dispatch({ type: "END_UPDATE" });
    };
    // form init
    console.log(attr);
    const { control, handleSubmit } = useForm({
        defaultValues: {
            ...attr,
            install_date: DataConvert(attr.install_date),
            LAST_MAINTENANCE_DATE: DataConvert(attr.LAST_MAINTENANCE_DATE),
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

        billboards
            .applyEdits({
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
            <div className="w-full flex items-center justify-between md:px-2">
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
                    className="w-full h-fit grid grid-cols-2 gap-2 md:gap-6 gap-y-7 py-3 md:p-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* city */}
                    <Controller
                        key="city"
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value || ""} // Ensure value is never null
                                {...field}
                                className=" w-full text-right"
                                id="standard-basic"
                                type="text"
                                label="إسم المدينة"
                                variant="standard"
                                dir="rtl"
                            />
                        )}
                    />
                    {/* street_name */}
                    <Controller
                        key="street_name"
                        name="street_name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value || ""} // Ensure value is never null
                                {...field}
                                className=" w-full text-right"
                                id="standard-basic"
                                type="text"
                                label="إسم الشارع"
                                variant="standard"
                                dir="rtl"
                            />
                        )}
                    />
                    {/* size */}
                    <Controller
                        key="size"
                        name="size"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value || ""} // Ensure value is never null
                                {...field}
                                className=" w-full text-right"
                                id="standard-basic"
                                type="text"
                                label="مقاس اللوحة"
                                variant="standard"
                                dir="rtl"
                            />
                        )}
                    />
                    {/* install_date */}
                    <Controller
                        key="install_date"
                        name="install_date"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value || ""} // Ensure value is never null
                                {...field}
                                className=" w-full text-right"
                                id="standard-basic"
                                type="date"
                                label="تاريخ التركيب"
                                variant="standard"
                                dir="rtl"
                            />
                        )}
                    />
                    {/* notes */}
                    <Controller
                        key="notes"
                        name="notes"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value || ""} // Ensure value is never null
                                {...field}
                                className=" w-full text-right"
                                id="standard-basic"
                                type="date"
                                label="ملاحظات"
                                variant="standard"
                                dir="rtl"
                            />
                        )}
                    />
                    {/* type */}
                    <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="نوع اللوحة"
                                variant="standard"
                            >
                                <MenuItem dir="rtl" key="asd" value="0">
                                    رقمية
                                </MenuItem>
                                <MenuItem dir="rtl" key="asd" value="1">
                                    ثابتة
                                </MenuItem>
                                <MenuItem dir="rtl" key="asd" value="2">
                                    دوارة
                                </MenuItem>
                            </TextField>
                        )}
                    />
                    {/* orientation */}
                    <Controller
                        name="orientation"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="تاريخ التركيب"
                                variant="standard"
                            >
                                <MenuItem dir="rtl" key="asd" value="0">
                                    شمال
                                </MenuItem>
                                <MenuItem dir="rtl" key="asd" value="1">
                                    جنوب
                                </MenuItem>
                                <MenuItem dir="rtl" key="asd" value="2">
                                    شارع داخلى
                                </MenuItem>
                                <MenuItem dir="rtl" key="asd" value="3">
                                    مزدوج
                                </MenuItem>
                            </TextField>
                        )}
                    />
                    {/* ownership */}
                    <Controller
                        name="ownership"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="المالك"
                                variant="standard"
                            >
                                <MenuItem dir="rtl" key="asd" value="1">
                                    حكومى
                                </MenuItem>
                                <MenuItem dir="rtl" key="asd" value="0">
                                    خاص
                                </MenuItem>
                            </TextField>
                        )}
                    />
                    {/* status */}
                    <Controller
                        name="status"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="حالة اللوحة"
                                variant="standard"
                            >
                                <MenuItem dir="rtl" key="asd" value="0">
                                    نشطة
                                </MenuItem>
                                <MenuItem dir="rtl" key="asd" value="1">
                                    قيد الصيانة
                                </MenuItem>
                                <MenuItem dir="rtl" key="asd" value="2">
                                    معطلة
                                </MenuItem>
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

export default ReqUpdate;
