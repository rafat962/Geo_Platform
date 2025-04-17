import React from "react";
import styled from "styled-components";
import MapMain from "./utils/MapMain";
import LeftNav from "./utils/LeftNav/LeftNav";
import { NavContext } from "./context/NavContext";
import RightNav from "./utils/RightNav/RightNav";
import { RightNavContext } from "./context/RightNavContext";
const Main = styled.main`
    display: grid;
    grid-template-columns: 3rem auto 3rem;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const Sidebar = styled.aside`
    overflow: auto;
    /* Hide scrollbar for WebKit (Chrome, Safari, Edge) */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Optional: remove track and thumb for safety */
    &::-webkit-scrollbar-track {
        display: none;
    }

    &::-webkit-scrollbar-thumb {
        display: none;
    }

    /* Hide scrollbar for Firefox */
    scrollbar-width: none;
    scrollbar-color: transparent transparent;
`;

const Body = styled.div`
    /* Hide scrollbar for WebKit (Chrome, Safari, Edge) */
    &::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;
const MangerMap = () => {
    return (
        <main className="grid [grid-template-columns:3rem_auto] md:[grid-template-columns:3rem_auto_3rem] h-screen w-screen overflow-hidden">
            <RightNavContext>
                <NavContext>
                    {/* sidebar */}
                    <Sidebar className=" bg-slate-800 text-white">
                        <LeftNav />
                    </Sidebar>
                    {/* main content */}
                    <Body className=" bg-sec = trans overflow-auto">
                        <MapMain />
                    </Body>
                    {/* Right sidebar */}
                    <Sidebar className=" bg-slate-800 text-white hidden md:flex">
                        <RightNav />
                    </Sidebar>
                </NavContext>
            </RightNavContext>
        </main>
    );
};

export default MangerMap;
