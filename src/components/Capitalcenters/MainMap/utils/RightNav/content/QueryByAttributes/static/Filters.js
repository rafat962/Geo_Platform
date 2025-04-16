let attributesList = [
    {
        name: "LandUse",
        type: "domain",
    },
    {
        name: "FLOORSCOUNT",
        type: "number",
    },
    {
        name: "HEIGHT",
        type: "number",
    },
    {
        name: "START_DATE",
        type: "date",
    },
];
const operatorsList = [
    {
        name: "=",
        label: "Equals",
        requiresValue: true,
        appliesTo: ["number", "string", "date", "domain"],
    },
    {
        name: "!=",
        label: "Not Equal",
        requiresValue: true,
        appliesTo: ["number", "string", "date", "domain"],
    },
    {
        name: "<>",
        label: "Not Equal (Alt)",
        requiresValue: true,
        appliesTo: ["number", "string", "date", "domain"],
    },
    {
        name: ">",
        label: "Greater Than",
        requiresValue: true,
        appliesTo: ["number", "date"],
    },
    {
        name: ">=",
        label: "Greater Than or Equal",
        requiresValue: true,
        appliesTo: ["number", "date"],
    },
    {
        name: "<",
        label: "Less Than",
        requiresValue: true,
        appliesTo: ["number", "date"],
    },
    {
        name: "<=",
        label: "Less Than or Equal",
        requiresValue: true,
        appliesTo: ["number", "date"],
    },
    {
        name: "LIKE",
        label: "Like (Pattern Match)",
        requiresValue: true,
        appliesTo: ["string", "domain"],
    },
    {
        name: "IN",
        label: "In (Multiple Values)",
        requiresValue: true,
        appliesTo: ["number", "string", "domain"],
    },
    {
        name: "BETWEEN",
        label: "Between (Range)",
        requiresValue: true,
        appliesTo: ["number", "date"],
    },
    {
        name: "IS NULL",
        label: "Is Null",
        requiresValue: false,
        appliesTo: ["number", "string", "date", "domain"],
    },
    {
        name: "IS NOT NULL",
        label: "Is Not Null",
        requiresValue: false,
        appliesTo: ["number", "string", "date", "domain"],
    },
];
const logicalOperatorsList = [
    {
        name: "AND",
        lable: "And",
        description: "Returns true if all conditions are true.",
        appliesTo: ["all"],
    },
    {
        name: "OR",
        lable: "Or",
        description: "Returns true if at least one condition is true.",
        appliesTo: ["all"],
    },
    {
        name: "NOT",
        lable: "Not",
        description: "Returns true if the condition is false.",
        appliesTo: ["single condition"],
    },
];

export { operatorsList, attributesList, logicalOperatorsList };
