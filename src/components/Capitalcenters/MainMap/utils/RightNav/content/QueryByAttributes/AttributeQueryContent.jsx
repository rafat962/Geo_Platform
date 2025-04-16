/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { PointsLayerService } from "../../../../../../../shared/static/StaticMapData";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { HiMagnifyingGlass, HiMiniArrowUturnLeft } from "react-icons/hi2";
import AttrQueryControllers from "./utils/AttrQueryControllers";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
const AttributeQueryContent = () => {
    // form init
    const { register, control, handleSubmit, reset, watch } = useForm({
        shouldUnregister: true,
        defaultValues: {
            attribute_1: "LandUse", //
            oberator_1: "=",
            query_1: "",
        },
    });
    // -------------------- actions --------------------
    const [ResultNumber, setResultNumber] = useState(null);
    function onSubmit(data) {
        let attributes = [];
        let operators = [];
        let queries = [];
        let LogicalOperators = [];
        Object.entries(data).forEach(([key, value]) => {
            if (key.startsWith("attribute")) {
                attributes.push(value);
            } else if (key.startsWith("oberator")) {
                operators.push(value);
            } else if (key.startsWith("query")) {
                queries.push(value);
            } else if (key.startsWith("LogicalOperator")) {
                LogicalOperators.push(value);
            }
        });
        let finalWhereCluasArr = [];
        attributes.forEach((item, index) => {
            if (item === "LandUse" || item === "START_DATE") {
                finalWhereCluasArr.push(item);
                finalWhereCluasArr.push(operators[index]);
                if (
                    operators[index] === "IS NULL" ||
                    operators[index] === "IS NOT NULL"
                )
                    return;
                finalWhereCluasArr.push(`'${queries[index]}'`);
            } else {
                finalWhereCluasArr.push(item);
                finalWhereCluasArr.push(operators[index]);
                if (
                    operators[index] === "IS NULL" ||
                    operators[index] === "IS NOT NULL"
                )
                    return;
                finalWhereCluasArr.push(+queries[index]);
            }
            if (LogicalOperators[index]) {
                finalWhereCluasArr.push(`${LogicalOperators[index]}`);
            }
        });
        let finalQuery = finalWhereCluasArr.join(" ");
        PointsLayerService.definitionExpression = finalQuery;
        PointsLayerService.queryFeatures({
            where: `${finalQuery}`,
            returnCountOnly: true,
        }).then((res) => {
            setResultNumber(res.features.length);
        });
    }
    function resetQuery() {
        PointsLayerService.definitionExpression = "";
        setResultNumber(null);
        setFormBlocksNum([1]);
        reset();
    }
    function onError(error) {
        toast.error("يجب عليك ملئ جميع المدخلات لإجراء الإستعلام");
        setResultNumber(null);
    }
    // -------------------- Add More Queries Logic --------------------
    let [formBlocksNum, setFormBlocksNum] = useState([1]);
    return (
        <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="mb-2 flex flex-col hide-scrollbar items-center justify-start w-full h-full px-3 py-4 overflow-auto"
        >
            {/* Controllers */}
            <div className="w-full h-fit  ">
                {formBlocksNum?.map((val, index) => (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="flex flex-col items-center justify-center space-y-2"
                    >
                        <div className="flex items-center justify-center rounded-full bg-gray-100 px-8 py-2">
                            <h1>Block {index + 1}</h1>
                        </div>
                        <AttrQueryControllers
                            control={control}
                            watch={watch}
                            register={register}
                            attrFieldName={`attribute_${index + 1}`}
                            oberatorFieldName={`oberator_${index + 1}`}
                            queryFieldName={`query_${index + 1}`}
                            LogicalOperator={`LogicalOperator_${index + 1}`}
                            setFormBlocksNum={setFormBlocksNum}
                            formBlocksNum={formBlocksNum.length}
                            blockNum={index + 1}
                            key={`block-${index}`}
                        />
                    </motion.div>
                ))}
            </div>
            {/* actions */}
            <div className="flex items-center justify-center space-x-4 w-full">
                <Button
                    sx={{
                        margin: "2px",
                    }}
                    startIcon={<HiMagnifyingGlass />}
                    type="submit"
                    className="w-full"
                    variant="contained"
                >
                    Query
                </Button>
                <Button
                    sx={{
                        margin: "2px",
                    }}
                    startIcon={<HiMiniArrowUturnLeft />}
                    type="button"
                    onClick={resetQuery}
                    className="w-full"
                    variant="contained"
                    color="error"
                >
                    Reset
                </Button>
            </div>
            {ResultNumber && (
                <h1 className="my-4 text-lg ">
                    Total Queries:
                    <span className="text-blue-500 font-bold">
                        {ResultNumber}
                    </span>
                </h1>
            )}
        </form>
    );
};

export default AttributeQueryContent;
