import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import { attributesList } from "../QueryByAttributes/static/Filters";
import { applyLabelingInfo } from "../../../../../../../shared/static/StaticMapData";
const LableContent = () => {
    let attr = attributesList;
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            field: "None",
        },
    });
    const fieldInput = watch("field");
    useEffect(() => {
        if (!fieldInput) return;
        applyLabelingInfo(fieldInput);
    }, [fieldInput]);

    function onSubmit(data) {
        console.log(data);
    }
    function onError(error) {
        console.log(error);
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="mb-2 flex flex-col hide-scrollbar items-center justify-start w-full h-full px-3 py-4 overflow-auto"
        >
            {/* select field */}
            <Controller
                rules={{ required: true }}
                name="field"
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
                        <MenuItem key="8" value="None">
                            None
                        </MenuItem>
                        {attr.map((item) => (
                            <MenuItem key={item.name} value={item.name}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        </form>
    );
};

export default LableContent;
