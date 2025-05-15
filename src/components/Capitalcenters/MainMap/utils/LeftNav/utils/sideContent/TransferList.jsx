/* eslint-disable no-unused-vars */
import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useSearchParams } from "react-router-dom";

function not(a, b) {
    return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
    return a.filter((value) => b.includes(value));
}

function union(a, b) {
    return [...a, ...not(b, a)];
}
const permissions = [
    {
        name: "Add Layer",
        id: "T8g4K9zQa",
    },
    {
        name: "Change Basemap",
        id: "W1dXp7Lrm",
    },
    {
        name: "Share Map",
        id: "F2qVr8Xpt",
    },
    {
        name: "Make Query",
        id: "M5kZn2Qwb",
    },
    {
        name: "Set Label",
        id: "R9mBf3Tyo",
    },
    {
        name: "Edit Data",
        id: "C7hDs6Nqe",
    },
    {
        name: "Set Buffer",
        id: "L4zWu1Kti",
    },
    // {
    //     name: "Use Route",
    //     id: "P6qVy9Zmd",
    // },
    {
        name: "Use Tools",
        id: "A3nJr5Wqv",
    },
    {
        name: "Print",
        id: "E8bXc7Mls",
    },
    {
        name: "See Attributes",
        id: "znJBiDUnhR4B@Kv7",
    },
];
export default function TransferList() {
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(permissions);
    const [right, setRight] = React.useState([]);
    const [searchParams, SetSearchParams] = useSearchParams();
    React.useEffect(() => {
        const ids = right.map((item) => item.id);
        searchParams.set("gIjxYweHWxrC1", ids.join(","));
        SetSearchParams(searchParams);
    }, [right]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title, items) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={
                            numberOfChecked(items) === items.length &&
                            items.length !== 0
                        }
                        indeterminate={
                            numberOfChecked(items) !== items.length &&
                            numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            "aria-label": "all items selected",
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 400,
                    height: 530,
                    bgcolor: "background.paper",
                    overflow: "auto",
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;
                    return (
                        <ListItemButton
                            key={value.name}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.includes(value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        "aria-labelledby": labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={`${value.name}`}
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );

    return (
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Grid>{customList("All Permissions", left)}</Grid>
            <Grid>
                <Grid
                    container
                    direction="column"
                    sx={{ alignItems: "center" }}
                >
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid>{customList("Assigned Permissions", right)}</Grid>
        </Grid>
    );
}
