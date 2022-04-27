import { Reset } from "styled-reset";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { basicTheme, darkTheme } from "./theme";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { isActiveAtom, themeAtom } from "./atoms";
import { BrowserRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.bgColor};
    }

    a {
        text-decoration: none;
        color: #222;
    }

    button {
        background-color: transparent;
        border: 1px solid #222;
        background-color: #fff;
    }
`;

const Container = styled.div<{ isActive: boolean }>`
    margin-left: ${(props) => (props.isActive ? "300px" : 0)};
    position: relative;
    transition: margin-left 0.5s ease-in-out;
`;

const ToggleBtn = styled.button`
    position: absolute;
    top: 120px;
    right: 10px;
    font-size: 32px;
    cursor: pointer;
`;

function App() {
    const [isLight, setIsLight] = useRecoilState(themeAtom);
    const isActive = useRecoilValue(isActiveAtom);

    const toggleTheme = () => setIsLight((current) => !current);

    return (
        <ThemeProvider theme={isLight ? basicTheme : darkTheme}>
            <BrowserRouter>
                <Reset />
                <GlobalStyles />
                <SideBar />
                <Container isActive={isActive}>
                    <ToggleBtn onClick={toggleTheme}>
                        <FontAwesomeIcon icon={isLight ? faMoon : faSun} />
                    </ToggleBtn>
                    <Header />
                    <Router />
                </Container>
                <ReactQueryDevtools initialIsOpen={true} />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
