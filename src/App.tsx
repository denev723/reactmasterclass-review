import { Reset } from "styled-reset";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { useRecoilValue } from "recoil";
import { isActiveAtom } from "./atoms";
import { BrowserRouter } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
    a {
        text-decoration: none;
        color: #222;
    }
`;

const Container = styled.div<{ isActive: boolean }>`
    margin-left: ${(props) => (props.isActive ? "300px" : 0)};
`;

function App() {
    const isActive = useRecoilValue(isActiveAtom);

    return (
        <BrowserRouter>
            <Reset />
            <GlobalStyles />
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
