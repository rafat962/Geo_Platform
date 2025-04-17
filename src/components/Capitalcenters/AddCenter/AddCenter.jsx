/* eslint-disable no-unused-vars */
import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    BuildingStateDomain,
    matrialDomain,
    formFields,
    landUseDomain,
} from "../shared/helpers/CentralCodeToDomain";
import { PointsLayerService } from "../../../shared/static/StaticMapData";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import AddMap from "./utils/AddMap";
import { Point } from "@arcgis/core/geometry";
import { useGetDarkmode } from "../../../shared/hooks/useGetDarkmode";
const AddCenter = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let pointX = searchParams.get("x");
    let pointY = searchParams.get("y");
    const [open, setOpen] = React.useState(false); // for backdrop

    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
    });
    // form init
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            LandUse: "سكنى",
        },
    });
    // submit
    const query = useQueryClient();
    function onSubmit(data) {
        setOpen(true);
        const point = new Point({
            x: Number(pointX),
            y: Number(pointY),
        });
        // Critical validation step
        if (!point.extent) {
            point.normalize();
        }
        const addedFeature = {
            attributes: {
                ...data,
            },
            geometry: point,
        };
        PointsLayerService.applyEdits({
            addFeatures: [addedFeature],
        })
            .then((res) => {
                query.invalidateQueries(["buildingsData"]);
                toast.success("تم إضافة الأصل بنجاح");
                reset();
                navigate("../AllCenters");
                setOpen(false);
            })
            .catch((err) => {
                toast.error(err.message);
                setOpen(false);
            });
    }
    const { mode } = useGetDarkmode();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* form */}
            <CacheProvider value={cacheRtl}>
                {/* This is required for dark mode to take full effect */}
                <div className="w-full h-96">
                    <AddMap />
                </div>
                <form
                    className=" w-full h-fit grid grid-cols-2 gap-2 md:gap-6 gap-y-7 py-3 md:p-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* All fields */}
                    {formFields.map((fieldItem) => (
                        <TextField
                            key={fieldItem.fieldName}
                            {...register(fieldItem.fieldName, {
                                valueAsNumber:
                                    fieldItem.type === "number" ? true : false,
                            })}
                            className=" w-full text-right"
                            id="standard-basic"
                            type={fieldItem.type}
                            label={fieldItem.lable}
                            variant="standard"
                            dir="rtl"
                            defaultValue={fieldItem.type === "number" ? 0 : ""}
                        />
                    ))}
                    {/* LandUse */}
                    <Controller
                        name="LandUse"
                        control={control}
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
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="خامة البناء"
                                variant="standard"
                                value={field.value || ""}
                            >
                                {matrialDomain.map((item) => (
                                    <MenuItem
                                        dir="rtl"
                                        key={item.id}
                                        value={item.id}
                                    >
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
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="حالة المبنى"
                                variant="standard"
                                value={field.value || ""}
                            >
                                {BuildingStateDomain.map((item) => (
                                    <MenuItem
                                        dir="rtl"
                                        key={item.id}
                                        value={item.id}
                                    >
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
                        <p className="text-lg">إضافة الأصل</p>
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
};

export default AddCenter;
