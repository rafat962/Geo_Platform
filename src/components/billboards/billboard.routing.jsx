import { Navigate } from "react-router-dom";
import BillboardsDashboard from "./dashboard/BillboardsDashboard";
import BillboardsReq from "./billboardsReq/BillboardsReq";
import CurrentReq from "./billboardsReq/CurrentReq/CurrentReq";
import AddReq from "./billboardsReq/AddReq/AddReq";
const billboardRoutes = [
    {
        path: "/billboardsDashboard",
        element: <BillboardsDashboard />,
    },
    {
        path: "/billboardsReq",
        element: <BillboardsReq />,
        children: [
            {
                path: "CurrentReq",
                element: <CurrentReq />,
            },
            {
                path: "AddReq",
                element: <AddReq />,
            },
        ],
    },
    {
        index: true,
        element: <Navigate to="/billboardsDashboard" replace />,
    },
];

export default billboardRoutes;
