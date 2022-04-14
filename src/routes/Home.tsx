import styled from "styled-components";
import { Helmet } from "react-helmet";

const Container = styled.main`
    height: calc(100vh - 109px);
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    h2 {
        font-size: 60px;
        font-weight: bold;
    }
`;

function Home() {
    return (
        <>
            <Helmet>
                <title>React Master Class Review</title>
            </Helmet>
            <Container>
                <Wrapper>
                    <h2>NomadCoders React Master Class Review</h2>
                </Wrapper>
            </Container>
        </>
    );
}

export default Home;
