import { BiLandscape, BiLayer } from "react-icons/bi";
import {
    HiAdjustmentsVertical,
    HiArchiveBoxArrowDown,
    HiMap,
    HiMiniArrowRightStartOnRectangle,
    HiOutlineChartPie,
    HiOutlineCommandLine,
    HiOutlineTableCells,
} from "react-icons/hi2";
import ListContainer from "./utils/ListContainer";
import Avatar from "@mui/material/Avatar";
import { useSideBar } from "./context/SideContext";
import ToggleList from "./utils/ToggleList";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import ListItem from "./utils/ListItem";

const SideBar = () => {
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
            className={`${NavWidth} "dark:bg-slate-950 transition-all ease-in-out duration-400 text-nowrap h-full p-1 py-3 pb-6 flex flex-col justify-between  border-l-[1px] border-l-gray-500 `}
        >
            <Avatar
                onClick={handleToggleNav}
                className={`${
                    openNav
                        ? "right-50 hover:translate-x-1"
                        : "right-10 scale-90 hover:-translate-x-1 rotate-180"
                }  top-30 z-10 cursor-pointer  hover:scale-105 transition-all ease-in-out duration-400 animate-spin-every-5s`}
                src="/public/next.png"
                sx={{
                    width: 22,
                    height: 22,
                    position: "absolute",
                    bgcolor: "white",
                }}
            ></Avatar>
            <ListContainer>
                {/* avatar */}
                <div className="flex flex-col items-center justify-center mb-5 space-y-2 tracking-wider  w-full">
                    {/* lgCase */}
                    <Avatar
                        src="/public/users/profile.png"
                        sx={{ width: 58, height: 58 }}
                        className={` ${
                            openNav ? "scale-100" : "scale-75"
                        } w-[56px] h-[56px]`}
                    ></Avatar>
                    {/* smCase */}
                    {openNav && <p className={` text-lg`}>رافت كامل محمد</p>}
                    <div className="w-full h-[1px] bg-gray-700 mt-2"></div>
                </div>
                <ListItem
                    toUrl="/dashboard"
                    openNav={openNav}
                    name="الرئيسية"
                    icon={<HiOutlineChartSquareBar />}
                />
                <ListItem
                    target="_blank"
                    toUrl="/MainMap"
                    openNav={openNav}
                    name="خريطة المعلومات"
                    icon={<HiOutlineCommandLine />}
                />
                {/* main toggle */}
                <ToggleList openNav={openNav}>
                    {/* header */}
                    <ToggleList.Header
                        open={wekala}
                        icon={<BiLayer className="text-xl" />}
                        headName="منطقة العاصمة"
                        handleClick={() => handleClick("wekala")}
                    />
                    <ToggleList.Body open={wekala}>
                        <ToggleList.SubHeader
                            open={investmentAssets}
                            handleClick={() => handleClick("investmentAssets")}
                            headName="المراكز الإدارية"
                        />
                        <ToggleList.Body type="other" open={investmentAssets}>
                            <ToggleList.Item
                                disable={false}
                                url="/CapitalCenter/AllCenters"
                                type="other"
                                name="عرض المراكز"
                            ></ToggleList.Item>
                            <ToggleList.Item
                                disable={false}
                                url="/CapitalCenter/AddCenter"
                                type="other"
                                name="إضافة مركز"
                            ></ToggleList.Item>
                        </ToggleList.Body>
                        <ToggleList.Item
                            url="/other"
                            name="طلبات المنطقة"
                        ></ToggleList.Item>
                        <ToggleList.Item
                            url="/other"
                            name="الخريطة الجغرافية"
                        ></ToggleList.Item>
                        <ToggleList.Item
                            url="/other"
                            name="متابعة ميدانية للمنطقة"
                        ></ToggleList.Item>
                        <ToggleList.Item
                            url="/other"
                            name="الفرص في المنطقة"
                        ></ToggleList.Item>
                        <ToggleList.Item
                            url="/other"
                            name="الإشعارات الجغرافية"
                        ></ToggleList.Item>
                        <ToggleList.Item
                            url="/other"
                            name="تقارير المنطقة"
                        ></ToggleList.Item>
                    </ToggleList.Body>

                    {/* المحافظات */}
                    <ToggleList.Header
                        open={gov}
                        icon={<BiLayer className="text-xl" />}
                        headName="منطقة الشمال"
                        handleClick={() => handleClick("gov")}
                    />
                    <ToggleList.Body open={gov}>
                        <ToggleList.SubHeader
                            open={govAssets}
                            handleClick={() => handleClick("govAssets")}
                            headName="القرى التابعة"
                        />
                        <ToggleList.Body type="other" open={govAssets}>
                            <ToggleList.Item
                                type="other"
                                name="عرض القرى"
                            ></ToggleList.Item>
                            <ToggleList.Item
                                type="other"
                                name="إضافة قرية"
                            ></ToggleList.Item>
                            <ToggleList.Item
                                type="other"
                                name="تحديث حالة القرية"
                            ></ToggleList.Item>
                            <ToggleList.Item
                                type="other"
                                name="تقرير القرى"
                            ></ToggleList.Item>
                        </ToggleList.Body>
                        <ToggleList.Item name="طلبات القرى"></ToggleList.Item>
                        <ToggleList.Item name="الخريطة الجغرافية"></ToggleList.Item>
                        <ToggleList.Item name="متابعة ميدانية"></ToggleList.Item>
                        <ToggleList.Item name="الفرص في القرى"></ToggleList.Item>
                        <ToggleList.Item name="إشعارات القرى"></ToggleList.Item>
                        <ToggleList.Item name="تقارير تفصيلية"></ToggleList.Item>
                    </ToggleList.Body>
                </ToggleList>

                <ListItem
                    toUrl="/LandUses"
                    openNav={openNav}
                    name="إستعمالات الأراضى"
                    icon={<HiOutlineChartPie />}
                />
                <ListItem
                    toUrl="/Landmark"
                    openNav={openNav}
                    name="العلامات المميزة"
                    icon={<BiLandscape />}
                />
            </ListContainer>
            <ListContainer>
                <ListItem
                    toUrl="/Settings"
                    openNav={openNav}
                    name="الإعدادات"
                    icon={<HiAdjustmentsVertical />}
                />
                <ListItem
                    toUrl="/LogOut"
                    openNav={openNav}
                    name="تسجيل الخروج"
                    icon={<HiMiniArrowRightStartOnRectangle />}
                />
            </ListContainer>
        </div>
    );
};

export default SideBar;
