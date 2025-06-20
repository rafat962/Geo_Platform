/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Taps from "../../Dashboard/utils/Taps";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";
import { billboards } from "../helpers/billboard.StaticData";
import Map from "./utils/Map";
import { Button } from "@mui/material";
import { NumberTicker } from "../../../shared/ui/NumberTicker";

const taps = [
    {
        name: "لوحات معطلة",
        number: "896",
        textColor: "text-red-500 dark:text-red-200",
        bgColor: "bg-red-200 dark:bg-red-600",
        imgPath: "/billboards/dashboards/billboard1.png",
    },
    {
        name: "لوحات قيد الصيانة",
        number: "35",
        textColor: "text-amber-500 dark:text-amber-200",
        bgColor: "bg-amber-200 dark:bg-amber-600",
        imgPath: "/billboards/dashboards/billboard2.png",
    },
    {
        name: "لوحات نشطة",
        number: "12",
        textColor: "text-green-500 dark:text-green-200",
        bgColor: "bg-green-200 dark:bg-green-600",
        imgPath: "/billboards/dashboards/billboard3.png",
    },
];
const BillboardsDashboard = () => {
    const [tapss, setTaps] = useState(taps);
    // get Taps Nums
    useEffect(() => {
        billboards
            .queryFeatureCount({
                where: "status=0",
                outFields: [""],
            })
            .then((count) => {
                console.log(count);
                setTaps((prevTaps) => {
                    const updatedTaps = [...prevTaps];
                    updatedTaps[2] = {
                        ...updatedTaps[2],
                        number: count.toString(), // convert to string if needed
                    };
                    return updatedTaps;
                });
            });
    }, []);
    useEffect(() => {
        billboards
            .queryFeatureCount({
                where: "status=1",
                outFields: [""],
            })
            .then((count) => {
                console.log(count);
                setTaps((prevTaps) => {
                    const updatedTaps = [...prevTaps];
                    updatedTaps[1] = {
                        ...updatedTaps[1],
                        number: count.toString(), // convert to string if needed
                    };
                    return updatedTaps;
                });
            });
    }, []);
    useEffect(() => {
        billboards
            .queryFeatureCount({
                where: "status=2",
                outFields: [""],
            })
            .then((count) => {
                console.log(count);
                setTaps((prevTaps) => {
                    const updatedTaps = [...prevTaps];
                    updatedTaps[0] = {
                        ...updatedTaps[0],
                        number: count.toString(), // convert to string if needed
                    };
                    return updatedTaps;
                });
            });
    }, []);
    // map
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
        control,
    } = useForm({
        defaultValues: {
            type: "",
            orientation: "",
            ownership: "",
            status: "",
        },
    });
    const formValues = watch();
    const [querySum, setQuerySum] = useState(0);

    // get filters
    useEffect(() => {
        let queryList = [];
        Object.entries(formValues).forEach(([key, value]) => {
            if (value !== "") {
                if (value === undefined) return;
                queryList.push(`${key}='${value}'`);
            }
        });
        let finalQuery = queryList.join(" AND ");
        billboards.definitionExpression = finalQuery;
        billboards
            .queryFeatureCount({
                where: finalQuery,
            })
            .then((sum) => {
                setQuerySum(sum);
            });
    }, [formValues]);
    // reset filters
    const resetFilters = () => {
        reset({
            type: "",
            orientation: "",
            ownership: "",
            status: "",
        });
        billboards.definitionExpression = "";
        billboards
            .queryFeatureCount({
                where: "1=1", // This will return all features
            })
            .then((sum) => {
                setQuerySum(sum);
            });
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full  p-0.5 md:p-2"
        >
            <div className="flex flex-col h-full space-y-4 items-start justify-start ">
                {/* first Row Taps */}
                <Taps taps={tapss} />
                {/* second Row Map */}
                <div className="w-full h-full flex flex-col space-y-2 ">
                    {/* header */}
                    <div className="flex w-full items-center justify-between  border-b-1 border-b-gray-600">
                        {/* Reset */}
                        <Button onClick={resetFilters} variant="contained">
                            Reset
                        </Button>
                        {/* filters */}
                        <form className="w-fit flex items-center justify-end">
                            {/* sum */}
                            <div className="mt-2 mx-8 flex items-center space-x-4 outline-2 outline-blue-500 p-2 rounded-full px-6">
                                <NumberTicker
                                    className={`text-2xl font-bold text-blue-500`}
                                    value={querySum}
                                />
                                <p className="text-xl">: الإجمالى</p>
                            </div>
                            {/* type */}
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 200 }}
                            >
                                <InputLabel id="type-label">
                                    نوع اليافطة
                                </InputLabel>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="type-label"
                                            id="type"
                                            label="نوع اليافطة"
                                        >
                                            <MenuItem value="">الكل</MenuItem>
                                            <MenuItem value={0}>رقمية</MenuItem>
                                            <MenuItem value={1}>ثابتة</MenuItem>
                                            <MenuItem value={2}>دوارة</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            {/* orientation */}
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 200 }}
                            >
                                <InputLabel id="orientation-label">
                                    إتجاه اليافطة
                                </InputLabel>
                                <Controller
                                    name="orientation"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="orientation-label"
                                            id="orientation"
                                            label="إتجاه اليافطة"
                                        >
                                            <MenuItem value="">الكل</MenuItem>
                                            <MenuItem value={0}>شمال</MenuItem>
                                            <MenuItem value={1}>جنوب</MenuItem>
                                            <MenuItem value={2}>
                                                شارع داخلى
                                            </MenuItem>
                                            <MenuItem value={3}>مزدوج</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            {/* ownership */}
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 200 }}
                            >
                                <InputLabel id="ownership-label">
                                    المالك
                                </InputLabel>
                                <Controller
                                    name="ownership"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="ownership-label"
                                            id="ownership"
                                            label="المالك"
                                        >
                                            <MenuItem value="">الكل</MenuItem>
                                            <MenuItem value={0}>
                                                شركات خاصة
                                            </MenuItem>
                                            <MenuItem value={1}>
                                                البلدية
                                            </MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            {/* status */}
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 200 }}
                            >
                                <InputLabel id="status-label">
                                    حالة اللوحة
                                </InputLabel>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="status-label"
                                            id="status"
                                            label="حالة اللوحة"
                                        >
                                            <MenuItem value="">الكل</MenuItem>
                                            <MenuItem value={0}>نشطة</MenuItem>
                                            <MenuItem value={1}>
                                                قيد الصيانة
                                            </MenuItem>
                                            <MenuItem value={2}>معطلة</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </form>
                    </div>
                    {/* map */}
                    <Map />
                </div>
            </div>
        </motion.div>
    );
};

export default BillboardsDashboard;
