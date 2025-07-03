// ----------------------- typeDomain -----------------------
const typeDomain = [
    {
        id: "0",
        name: "رقمية",
    },
    {
        id: "1",
        name: "ثابتة",
    },
    {
        id: "2",
        name: "دوارة",
    },
];
function typeDomainFN(id) {
    const type = typeDomain.find((item) => item.id === id);
    return type?.name ? type.name : "لا يوجد";
}
// ----------------------- orientationDomain -----------------------
const orientationDomain = [
    {
        id: "0",
        name: "شمال",
    },
    {
        id: "1",
        name: "جنوب",
    },
    {
        id: "2",
        name: "شارع داخلى",
    },
    {
        id: "3",
        name: "مزدوج",
    },
];
function orientationDomainFN(id) {
    const orientation = orientationDomain.find((item) => item.id === id);
    return orientation?.name ? orientation.name : "لا يوجد";
}
// ----------------------- statusDomain -----------------------
const statusDomain = [
    {
        id: "0",
        name: "نشطة",
    },
    {
        id: "1",
        name: "قيد الصيانة",
    },
    {
        id: "2",
        name: "معطلة",
    },
];
function statusDomainFN(id) {
    const status = statusDomain.find((item) => item.id === id);
    return status?.name ? status.name : "لا يوجد";
}
// ----------------------- ownerDomain -----------------------
const ownerDomain = [
    {
        id: "0",
        name: "خاص",
    },
    {
        id: "1",
        name: "حكومى",
    },
];
function ownerDomainFN(id) {
    const owner = ownerDomain.find((item) => item.id === id);
    return owner?.name ? owner.name : "لا يوجد";
}

export { typeDomainFN, orientationDomainFN, statusDomainFN, ownerDomainFN };
