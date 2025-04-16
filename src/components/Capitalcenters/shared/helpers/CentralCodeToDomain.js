// ----------------------- matrialDomain -----------------------
const matrialDomain = [
    {
        id: 4,
        name: "هيكلى",
    },
    {
        id: 1,
        name: "حوائط حاملة",
    },
];
function matrialDomainFN(id) {
    const matrial = matrialDomain.find((item) => item.id === id);
    return matrial?.name ? matrial.name : "لا يوجد";
}
// ----------------------- matrialDomain -----------------------
const BuildingStateDomain = [
    {
        id: 1,
        name: "متوسط",
    },
    {
        id: 2,
        name: "منهار",
    },
    {
        id: 3,
        name: "جيد",
    },
    {
        id: 9,
        name: "ردئ",
    },
];
function BuildingStateFN(id) {
    const BuildingState = BuildingStateDomain.find((item) => item.id === id);
    return BuildingState?.name ? BuildingState.name : "لا يوجد";
}

const formFields = [
    {
        fieldName: "SUBTYPE",
        lable: "النوع الفرعي للاستخدام",
        type: "number",
    },
    {
        fieldName: "DETAILSLANDUSE",
        lable: "رقم المميز للاستخدام التفصيلي للمبنى",
        type: "number",
    },
    {
        fieldName: "MAINLANDUSE",
        lable: "رقم المميز للاستخدام الرئيسي للمبنى",
        type: "number",
    },
    {
        fieldName: "DATASOURCE",
        lable: "مصدر البيانات",
        type: "text",
    },
    {
        fieldName: "FLOORSCOUNT",
        lable: "عدد الادوار للمبنى",
        type: "number",
    },
    {
        fieldName: "START_DATE",
        lable: "تاريخ الإنشاء",
        type: "date",
    },
    {
        fieldName: "OWNERNAME",
        lable: "إسم المالك",
        type: "text",
    },
    {
        fieldName: "DESCRIPTION",
        lable: "الوصف",
        type: "text",
    },
    {
        fieldName: "HEIGHT",
        lable: "الارتفاع",
        type: "number",
    },
    {
        fieldName: "SHOPSCOUNT",
        lable: "عدد المحلات في المبنى",
        type: "number",
    },
    {
        fieldName: "REGION_ID",
        lable: "رقم مميز المنطقة",
        type: "text",
    },
    {
        fieldName: "SECTOR_ID",
        lable: "رقم مميز القطاع",
        type: "text",
    },
    {
        fieldName: "AMANA_ID",
        lable: "رقم مميز الأمانة",
        type: "text",
    },
    {
        fieldName: "GOVERNORATE_ID",
        lable: "رقم مميز المحافظة",
        type: "text",
    },
    {
        fieldName: "CITY_ID",
        lable: "رقم مميز المدينة",
        type: "text",
    },
    {
        fieldName: "DISTRICT_ID",
        lable: "رقم مميز الحي",
        type: "text",
    },
    {
        fieldName: "PARCEL_ID",
        lable: "رقم مميز القطعة",
        type: "text",
    },
];
// ----------------------- landUseDomain -----------------------
const landUseDomain = [
    {
        name: "سكنى",
    },
    {
        name: "تجارى",
    },
    {
        name: "ترفيهى",
    },
    {
        name: "تعليمى",
    },
    {
        name: "ثقافى",
    },
    {
        name: "خدمات و مرافق",
    },
    {
        name: "دينى",
    },
    {
        name: "سكنى مختلط",
    },
    {
        name: "سياحى",
    },
    {
        name: "صحى",
    },
];
export {
    matrialDomainFN,
    matrialDomain,
    BuildingStateDomain,
    BuildingStateFN,
    formFields,
    landUseDomain,
};
