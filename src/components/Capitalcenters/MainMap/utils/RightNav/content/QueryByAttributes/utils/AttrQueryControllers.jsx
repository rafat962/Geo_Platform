import React, { useEffect, useState } from "react";
import { landUseDomain } from "../../../../../../shared/helpers/CentralCodeToDomain";
import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import { HiOutlinePlusCircle, HiOutlineXCircle } from "react-icons/hi2";
import { logicalOperatorsList } from "../static/Filters";
import { operatorsList, attributesList } from "../static/Filters";
const AttrQueryControllers = ({
    control,
    register,
    attrFieldName,
    oberatorFieldName,
    queryFieldName,
    setFormBlocksNum,
    blockNum,
    formBlocksNum,
    LogicalOperator,
    watch,
}) => {
    let attr = attributesList;
    let operators = operatorsList;
    // -------------------- type --------------------
    const [curQueryType, setCurQueryType] = useState("number"); // type
    const attributeInputText = watch(attrFieldName); // attributeInput
    useEffect(() => {
        if (!attributeInputText) return;
        let type = attr.find((item) => item.name === attributeInputText).type;
        let filterdOperators = operators.filter((op) =>
            op.appliesTo.includes(type)
        );
        setFilterdOperators(filterdOperators);
        setCurQueryType(type);
    }, [attributeInputText]);
    // -------------------- operator --------------------
    let [filterdOperators, setFilterdOperators] = useState([]);
    const [curOperator, setCurOperator] = useState(true); // operator
    const curOperatorType = watch(oberatorFieldName); // attributeInput
    useEffect(() => {
        if (!curOperatorType) return;
        let operator = operators.find((item) => item.name === curOperatorType);
        setCurOperator(operator.requiresValue);
    }, [curOperatorType]);
    // -------------------- submit --------------------

    return (
        <div className="w-full h-fit">
            {/* select field */}
            <Controller
                rules={{ required: true }}
                name={attrFieldName}
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="w-full text-right"
                        id="standard-basic"
                        select
                        label="Select Attribute"
                        variant="standard"
                    >
                        {attr.map((item) => (
                            <MenuItem key={item.name} value={item.name}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
            {/* Oberator */}
            <Controller
                rules={{ required: true }}
                name={oberatorFieldName}
                control={control}
                render={({ field }) => (
                    <TextField
                        sx={{
                            margin: "10px 0px",
                        }}
                        {...field}
                        className="w-full text-right"
                        id="standard-basic"
                        select
                        label="Select Oberator"
                        variant="standard"
                    >
                        {filterdOperators.map((item) => (
                            <MenuItem key={item.name} value={item.name}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
            {/* query */}
            {curOperator &&
                (curQueryType === "domain" ? (
                    <Controller
                        rules={{ required: true }}
                        name={queryFieldName}
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
                                    <MenuItem key={item.name} value={item.name}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                ) : (
                    <TextField
                        variant="standard"
                        label="Query"
                        type={curQueryType}
                        className="w-full text-right"
                        {...register(queryFieldName, { required: true })}
                    ></TextField>
                ))}
            {blockNum === formBlocksNum && (
                <div className="w-full flex items-center justify-center space-x-1 my-2">
                    <HiOutlinePlusCircle
                        onClick={() => setFormBlocksNum((prev) => [...prev, 1])}
                        className="text-3xl text-blue-600 cursor-pointer hover:translate-y-0.5 trans"
                    />
                    {blockNum > 1 && (
                        <HiOutlineXCircle
                            onClick={() =>
                                setFormBlocksNum((prev) => {
                                    let finalarr = [...prev].slice(
                                        1,
                                        [...prev].length
                                    );
                                    return finalarr;
                                })
                            }
                            className="text-3xl text-red-600 cursor-pointer hover:translate-y-0.5 trans"
                        />
                    )}
                    <div className=" w-[80%] bg-gray-500 h-[1.25px] flex items-center justify-center"></div>
                </div>
            )}
            {/* Logical Operator */}

            {blockNum !== formBlocksNum && (
                <>
                    <div className="flex items-center justify-center rounded-full bg-gray-100 px-8 py-2 mt-4">
                        <h1>Logical Operation</h1>
                    </div>
                    <Controller
                        rules={{ required: true }}
                        name={LogicalOperator}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field?.value || ""} // Ensure it starts with an empty string if undefined
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="Logical Operator"
                                variant="standard"
                                sx={{
                                    marginTop: "4px",
                                    marginBottom: "15px",
                                }}
                            >
                                {logicalOperatorsList.map((item) => (
                                    <MenuItem key={item.name} value={item.name}>
                                        {item.lable}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </>
            )}
        </div>
    );
};

export default AttrQueryControllers;
