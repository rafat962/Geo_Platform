/* eslint-disable no-unused-vars */
import { BiLandscape, BiLayer } from "react-icons/bi";
import {
    HiAdjustmentsVertical,
    HiMiniArrowRightStartOnRectangle,
    HiOutlineChartPie,
    HiOutlineCommandLine,
} from "react-icons/hi2";
import ListContainer from "./utils/ListContainer";
import Avatar from "@mui/material/Avatar";
import { useSideBar } from "./context/SideContext";
import ToggleList from "./utils/ToggleList";
import {
    HiOutlineChartSquareBar,
    HiOutlineDocumentReport,
} from "react-icons/hi";
import ListItem from "./utils/ListItem";
import AlertDialog from "../AlertDialog";
import { useQuery } from "@tanstack/react-query";
import { backendImagesUrl } from "../../../environment/devolpmentApi";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useSelector, useDispatch } from "react-redux";
const SideBar = () => {
    // redux
    const { permissions } = useSelector((state) => state.authorization);
    console.log(permissions);
    // lan
    const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    // -----------
    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: () => Promise.resolve(), // dummy fetcher
        enabled: false, // won't actually call the fetcher
    });
    const userName = userData?.name;
    const photo = `${backendImagesUrl}/users/${userData?.photo}`;
    // open Toggle
    const { dispatch, state } = useSideBar();
    const { wekala, gov, investmentAssets, govAssets, NavWidth, openNav } =
        state;
    const handleClick = (type) => {
        dispatch({ type: type });
    };
    const handleToggleNav = () => {
        dispatch({ type: "openNav" });
        dispatch({ type: "NavWidth" });
    };
    return (
        <div
            className={`${NavWidth} dark:bg-slate-950 transition-all ease-in-out duration-400 text-nowrap h-full p-1 py-3 pb-6 flex flex-col justify-between border-l-[1px] border-l-gray-500`}
        >
            <Avatar
                onClick={handleToggleNav}
                className={`${
                    openNav
                        ? `${isRTL ? "right-50 hover:translate-x-1" : "left-50 hover:translate-x-1 rotate-180"} `
                        : `${isRTL ? "right-10 scale-90 hover:-translate-x-1 rotate-180" : "left-10 scale-90 hover:-translate-x-1 "} `
                } top-30 z-10 cursor-pointer hover:scale-105 transition-all ease-in-out duration-400 animate-spin-every-5s`}
                src="/next.png"
                sx={{
                    width: 22,
                    height: 22,
                    position: "absolute",
                    bgcolor: "white",
                }}
            />
            <ListContainer>
                {/* avatar */}
                <div className="flex flex-col items-center justify-center mb-5 space-y-2 tracking-wider w-full">
                    <Avatar
                        src={photo ? photo : "/users/profile.png"}
                        sx={{ width: 58, height: 58 }}
                        className={` ${openNav ? "scale-100" : "scale-75"} w-[56px] h-[56px]`}
                    />
                    {openNav && <p className="text-lg">{userName || ""}</p>}
                    <div className="w-full h-[1px] bg-gray-700 mt-2"></div>
                </div>
                <ListItem
                    toUrl="/dashboard"
                    openNav={openNav}
                    name={t("الرئيسية")}
                    icon={<HiOutlineChartSquareBar />}
                />
                {permissions.includes("MainMap") && (
                    <ListItem
                        target="_blank"
                        toUrl="/MainMap"
                        openNav={openNav}
                        name={t("خريطة المعلومات")}
                        icon={<HiOutlineCommandLine />}
                    />
                )}
                {permissions.includes("CapitalCenter") && (
                    <>
                        <ToggleList openNav={openNav}>
                            <ToggleList.Header
                                open={wekala}
                                icon={<BiLayer className="text-xl" />}
                                headName={t("منطقة العاصمة")}
                                handleClick={() => handleClick("wekala")}
                            />
                            <ToggleList.Body open={wekala}>
                                <ToggleList.SubHeader
                                    open={investmentAssets}
                                    handleClick={() =>
                                        handleClick("investmentAssets")
                                    }
                                    headName={t("المراكز الإدارية")}
                                />
                                <ToggleList.Body
                                    type="other"
                                    open={investmentAssets}
                                >
                                    <ToggleList.Item
                                        disable={false}
                                        url="/CapitalCenter/AllCenters"
                                        type="other"
                                        name={t("عرض المراكز")}
                                    />
                                    <ToggleList.Item
                                        disable={false}
                                        url="/CapitalCenter/AddCenter"
                                        type="other"
                                        name={t("إضافة مركز")}
                                    />
                                </ToggleList.Body>
                                <ToggleList.Item
                                    url="/other"
                                    name={t("طلبات المنطقة")}
                                />
                                <ToggleList.Item
                                    url="/other"
                                    name={t("الخريطة الجغرافية")}
                                />
                                <ToggleList.Item
                                    url="/other"
                                    name={t("متابعة ميدانية للمنطقة")}
                                />
                                <ToggleList.Item
                                    url="/other"
                                    name={t("الفرص في المنطقة")}
                                />
                                <ToggleList.Item
                                    url="/other"
                                    name={t("الإشعارات الجغرافية")}
                                />
                                <ToggleList.Item
                                    url="/other"
                                    name={t("تقارير المنطقة")}
                                />
                            </ToggleList.Body>
                            {permissions.includes("NorthArea") && (
                                <>
                                    <ToggleList.Header
                                        open={gov}
                                        icon={<BiLayer className="text-xl" />}
                                        headName={t("منطقة الشمال")}
                                        handleClick={() => handleClick("gov")}
                                    />
                                    <ToggleList.Body open={gov}>
                                        <ToggleList.SubHeader
                                            open={govAssets}
                                            handleClick={() =>
                                                handleClick("govAssets")
                                            }
                                            headName={t("القرى التابعة")}
                                        />
                                        <ToggleList.Body
                                            type="other"
                                            open={govAssets}
                                        >
                                            <ToggleList.Item
                                                type="other"
                                                name={t("عرض القرى")}
                                            />
                                            <ToggleList.Item
                                                type="other"
                                                name={t("إضافة قرية")}
                                            />
                                            <ToggleList.Item
                                                type="other"
                                                name={t("تحديث حالة القرية")}
                                            />
                                            <ToggleList.Item
                                                type="other"
                                                name={t("تقرير القرى")}
                                            />
                                        </ToggleList.Body>
                                        <ToggleList.Item
                                            name={t("طلبات القرى")}
                                        />
                                        <ToggleList.Item
                                            name={t("الخريطة الجغرافية")}
                                        />
                                        <ToggleList.Item
                                            name={t("متابعة ميدانية")}
                                        />
                                        <ToggleList.Item
                                            name={t("الفرص في القرى")}
                                        />
                                        <ToggleList.Item
                                            name={t("إشعارات القرى")}
                                        />
                                        <ToggleList.Item
                                            name={t("تقارير تفصيلية")}
                                        />
                                    </ToggleList.Body>
                                </>
                            )}
                        </ToggleList>
                    </>
                )}
                {permissions.includes("LandUse") && (
                    <ListItem
                        toUrl="/LandUses"
                        openNav={openNav}
                        name={t("إستعمالات الأراضى")}
                        icon={<HiOutlineChartPie />}
                    />
                )}
                {permissions.includes("Reports") && (
                    <ListItem
                        toUrl="/Report/reportData"
                        openNav={openNav}
                        name={t("التقارير")}
                        icon={<HiOutlineDocumentReport />}
                    />
                )}
            </ListContainer>

            <ListContainer>
                {permissions.includes("Settings") && (
                    <ListItem
                        toUrl="/settings/email"
                        openNav={openNav}
                        name={t("الإعدادات")}
                        icon={<HiAdjustmentsVertical />}
                    />
                )}
                <AlertDialog
                    content={
                        <ListItem
                            openNav={openNav}
                            name={t("تسجيل الخروج")}
                            icon={<HiMiniArrowRightStartOnRectangle />}
                        />
                    }
                />
            </ListContainer>
        </div>
    );
};

export default SideBar;
