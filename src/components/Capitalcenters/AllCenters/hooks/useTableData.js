import { useQuery } from "@tanstack/react-query";
import { PointsLayerService } from "../../../../shared/static/StaticMapData";

export const useTableData = () => {
    const Layer = PointsLayerService;

    const {
        isLoading,
        data: buildingsData,
        error,
    } = useQuery({
        queryKey: ["buildingsData"],
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
    return { isLoading, buildingsData, error };
};
