/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button, MenuItem, TextField } from "@mui/material";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useNavContext } from "../../../../context/NavContext";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import esriRequest from "@arcgis/core/request";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../../../../../../environment/devolpmentApi";
import esriConfig from "@arcgis/core/config";
const AddLayersContent = () => {
    const [searchParams, SetSearchParams] = useSearchParams();
    const { state } = useNavContext();
    const { view } = state;
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            type: "FeatureLayer",
            url: "",
        },
    });
    const Selectedtype = watch("type");
    const [featureService, setFeatureServices] = useState([]);
    const [portalItems, setPortalItems] = useState([]);
    const [mapImageLayers, setMapImageLayers] = useState([]);
    // get layers oninit
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("LayerToken"));
        esriConfig.request.interceptors.push({
            urls: `${BASE_URL}`, // or use a regex like /gis\.coatessandbox\.com/
            before: function (params) {
                params.requestOptions.query = {
                    ...params.requestOptions.query,
                    token: token,
                };
            },
        });
        if (!view) return;
        // ----------- feature service case -----------
        const layers = searchParams.get("featureService")?.split(",") || [];
        if (layers.length > 0) {
            layers.forEach((layerUrl) => {
                esriRequest(`${BASE_URL}${layerUrl}`, {
                    query: { f: "json" },
                    responseType: "json",
                }).then((response) => {
                    const layers = response.data.layers;
                    layers.forEach((layerInfo, index) => {
                        const newLayer = new FeatureLayer({
                            url: `${BASE_URL}${layerUrl}/${index}`,
                            popupTemplate: {
                                title: "{Name}",
                                content: [
                                    {
                                        type: "fields",
                                        fieldInfos: [],
                                    },
                                ],
                            },
                        });
                        newLayer.load().then(() => {
                            // Get the fields from the layer
                            const fields = newLayer.fields;
                            // Generate fieldInfos dynamically based on the layer's fields
                            const fieldInfos = fields?.map((field) => ({
                                fieldName: field.name,
                                label: field.alias || field.name, // You can choose to display the alias if available
                                visible: true, // Set this to true to make the field visible in the popup
                            }));
                            // Update the popupTemplate with the dynamic fieldInfos
                            newLayer.popupTemplate.content[0].fieldInfos =
                                fieldInfos;
                        });
                        view.map.add(newLayer);
                    });
                });
            });
        }
        // ----------- portalItems case -----------
        const portalItems = searchParams.get("portalItems")?.split(",") || [];
        if (portalItems.length > 0) {
            portalItems.forEach((item) => {
                const layer = new FeatureLayer({
                    portalItem: {
                        id: item, // Your portal item ID
                    },
                    outFields: ["*"], // Ensure all fields are available
                });
                view.map.add(layer);
            });
        }
        // ----------- portalItems case -----------
        const mapImageLayers =
            searchParams.get("mapImageLayers")?.split(",") || [];
        if (mapImageLayers.length > 0) {
            mapImageLayers.forEach((item) => {
                const layer = new MapImageLayer({
                    url: item,
                });
                view.map.add(layer);
            });
        }
    }, [view]);
    function onSubmit(data) {
        const { type, url } = data;
        if (type === "FeatureLayer") {
            setFeatureServices((cur) => {
                searchParams.set("featureService", [...cur, url].join(","));
                return [...cur, url];
            });
            SetSearchParams(searchParams);
            esriRequest(`${BASE_URL}${url}`, {
                query: { f: "json" },
                responseType: "json",
            }).then((response) => {
                const layers = response.data.layers;
                layers.forEach((layerInfo, index) => {
                    const newLayer = new FeatureLayer({
                        url: `${BASE_URL}${url}/${index}`,
                        popupTemplate: {
                            title: "{Name}",
                            content: [
                                {
                                    type: "fields",
                                    fieldInfos: [],
                                },
                            ],
                        },
                    });
                    newLayer.load().then(() => {
                        // Get the fields from the layer
                        const fields = newLayer.fields;
                        // Generate fieldInfos dynamically based on the layer's fields
                        const fieldInfos = fields?.map((field) => ({
                            fieldName: field.name,
                            label: field.alias || field.name, // You can choose to display the alias if available
                            visible: true, // Set this to true to make the field visible in the popup
                        }));
                        // Update the popupTemplate with the dynamic fieldInfos
                        newLayer.popupTemplate.content[0].fieldInfos =
                            fieldInfos;
                    });
                    view.map.add(newLayer);
                });
            });
        } else if (type === "PortalItem") {
            setFeatureServices((cur) => {
                searchParams.set("portalItems", [...cur, url].join(","));
                return [...cur, url];
            });
            SetSearchParams(searchParams);
            const layer = new FeatureLayer({
                portalItem: {
                    id: url, // Your portal item ID
                },
                outFields: ["*"], // Ensure all fields are available
            });
            view.map.add(layer);
        } else if (type === "MapImageLayer") {
            setMapImageLayers((cur) => {
                searchParams.set("mapImageLayers", [...cur, url].join(","));
                return [...cur, url];
            });
            SetSearchParams(searchParams);
            const layer = new MapImageLayer({
                url: `${url}`,
            });
            view.map.add(layer);
        }
    }
    function onError(error) {
        toast.error(error.message);
    }
    return (
        <div className="w-full h-full p-2 py-4">
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="flex flex-col w-full h-full space-y-4"
            >
                {/* select type */}
                <Controller
                    rules={{ required: true }}
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="w-full text-right"
                            id="standard-basic"
                            select
                            label="Select Type"
                            variant="standard"
                        >
                            <MenuItem key="0" value="FeatureLayer">
                                Feature Layer
                            </MenuItem>
                            <MenuItem key="1" value="PortalItem">
                                Portal Item
                            </MenuItem>
                            <MenuItem key="2" value="MapImageLayer">
                                Map Image Layer
                            </MenuItem>
                        </TextField>
                    )}
                />
                {/* Add */}
                <Controller
                    rules={{ required: true }}
                    name="url"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="w-full text-right"
                            id="standard-basic"
                            type="text"
                            label={`Add ${Selectedtype} URL`}
                            variant="standard"
                        />
                    )}
                />
                <div className="flex items-center justify-center w-full my-4">
                    <Button
                        sx={{
                            margin: "2px",
                        }}
                        startIcon={<HiOutlinePlusCircle />}
                        type="submit"
                        className="w-full"
                        variant="contained"
                    >
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddLayersContent;
