import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

const Container = styled.div``;

function App() {
    return (
        <BrowserRouter>
            <Container>
                <SideBar />
                <Main />
            </Container>
        </BrowserRouter>
    );
}

export default App;
