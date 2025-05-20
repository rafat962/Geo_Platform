import Email from "./Email/Email";
import ExistingEmail from "./ExistingEmail/ExistingEmail";
import RequerstedEmails from "./RequerstedEmails/RequerstedEmails";
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
            {
                path: "requestedEmails",
                element: <RequerstedEmails />,
            },
            {
                path: "existingEmails",
                element: <ExistingEmail />,
            },
        ],
    },
    {
        index: true,
        element: <Navigate to="/settings/email" replace />,
    },
];

export default settingsRoutes;
