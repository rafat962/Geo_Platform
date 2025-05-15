import React, { useEffect, useRef } from "react";
import { layerUrl } from "../../../../../../../shared/static/StaticMapData";

const QueryBotContent = () => {
    const QueryBotContainer = useRef();
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
        script.onload = () => {
            window.voiceflow.chat.load({
                verify: { projectID: "65ed5462175bb21b06b58005" },
                url: "https://general-runtime.voiceflow.com",
                versionID: "production",
                voice: {
                    url: "https://runtime-api.voiceflow.com",
                },
                render: {
                    mode: "embedded",
                    target: QueryBotContainer.current,
                },
                launch: {
                    event: {
                        type: "launch",
                        payload: {
                            layerName: "Buildings",
                            layerUrl: layerUrl,
                            type: "Query",
                            fields: [
                                "LandUse",
                                "FLOORSCOUNT",
                                "HEIGHT",
                                "START_DATE",
                            ],
                        },
                    },
                },
            });
        };
        document.body.appendChild(script);
        // Optional cleanup if you want to remove it when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="w-full h-full overflow-auto py-2"
            ref={QueryBotContainer}
        ></div>
    );
};

export default QueryBotContent;
