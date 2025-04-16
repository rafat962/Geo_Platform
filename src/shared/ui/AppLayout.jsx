import styled from "styled-components";
import SideBar from "./SideBar/SideBar";
import Header from "./header/Header";
import { SideContext } from "./SideBar/context/SideContext";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

const Main = styled.main`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const HeaderContainer = styled.header`
    grid-column: 1/3;
    grid-row: 1;
    height: 4rem;
`;

const Sidebar = styled.aside`
    grid-column: 2;
    grid-row: 2;
    width: auto;
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
    grid-column: 1;
    grid-row: 2;
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

const AppLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (
                <Main>
                    {/* header */}
                    <HeaderContainer className="dark:bg-slate-900">
                        <Header />
                    </HeaderContainer>
                    {/* main content */}
                    <Body className=" bg-sec dark:bg-slate-950 trans overflow-auto">
                        <Outlet />
                    </Body>
                    {/* sidebar */}
                    <SideContext>
                        <Sidebar className=" dark:bg-slate-900 dark:text-white">
                            <SideBar />
                        </Sidebar>
                    </SideContext>
                </Main>
            )}
        </>
    );
};

export default AppLayout;
