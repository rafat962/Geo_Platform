import { useQuery } from "@tanstack/react-query";
import { billboards } from "../../../helpers/billboard.StaticData";

export const useReqTableData = () => {
    const Layer = billboards;

    const {
        isLoading,
        data: billboardsData,
        error,
    } = useQuery({
        queryKey: ["billboardsData"],
        queryFn: async () => {
            const result = await Layer.queryFeatures({
                where: "1=1",
                outFields: ["*"],
                returnGeometry: true,
                outSpatialReference: { wkid: 4326 },
            });
            return result.features.map((item) => item);
        },
        refetchInterval: 600000,
    });
    return { isLoading, billboardsData, error };
};
