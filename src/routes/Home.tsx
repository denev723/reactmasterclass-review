import styled from "styled-components";

const Container = styled.main``;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    h2 {
        font-size: 60px;
        font-weight: bold;
    }
`;

function Home() {
    return (
        <Container>
            <Wrapper>
                <h2>NomadCoders React Master Class Review</h2>
            </Wrapper>
        </Container>
    );
}

export default Home;
