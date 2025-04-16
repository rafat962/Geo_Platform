import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";

const Breadcrumb = () => {
    const breadcrumbs = [
        <Link key="1" underline="hover" color="inherit" to="/dashboard">
            الرئيسية
        </Link>,
        <Link key="2" underline="hover" color="inherit" href="/">
            منطقة العاصمة
        </Link>,
        <Typography key="3" sx={{ color: "text.primary" }}>
            كل الأصول
        </Typography>,
    ];
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            {breadcrumbs}
        </Breadcrumbs>
    );
};

export default Breadcrumb;
