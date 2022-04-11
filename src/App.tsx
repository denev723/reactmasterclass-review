import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import { Reset } from "styled-reset";

const Container = styled.div``;

function App() {
    return (
        <BrowserRouter>
            <Reset />
            <Container>
                <SideBar />
                <Main />
            </Container>
        </BrowserRouter>
    );
}

export default App;
