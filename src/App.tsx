import { Reset } from "styled-reset";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import styled from "styled-components";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { useRecoilValue } from "recoil";
import { isActiveAtom } from "./atoms";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";

const Container = styled.div<{ isActive: boolean }>`
    margin-left: ${(props) => (props.isActive ? "300px" : 0)};
`;

function App() {
    const isActive = useRecoilValue(isActiveAtom);
    const headerHeight = $(".sc-dkzDqf").outerHeight();

    useEffect(() => {
        $("main").css({ "min-height": "100vh" - headerHeight });
    }, []);

    return (
        <BrowserRouter>
            <Reset />
            <SideBar />
            <Container isActive={isActive}>
                <Header />
                <Router />
            </Container>
            <ReactQueryDevtools initialIsOpen={true} />
        </BrowserRouter>
    );
}

export default App;
