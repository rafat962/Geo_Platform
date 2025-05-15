import Email from "./Email/Email";
import Settings from "./Settings";
import { Navigate } from "react-router-dom";
const settingsRoutes = [
    {
        path: "/settings",
        element: <Settings />,
        children: [
            {
                path: "email",
                element: <Email />,
            },
        ],
    },
    {
        index: true,
        element: <Navigate to="/settings/email" replace />,
    },
];

export default settingsRoutes;
