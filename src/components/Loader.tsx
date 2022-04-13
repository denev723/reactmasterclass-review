import styled from "styled-components";

const Container = styled.div`
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.h2`
    text-align: center;
    font-size: 48px;
`;

interface IChildren {
    children: string;
}

function Loader({ children }: IChildren) {
    return (
        <Container>
            <Text>{children}</Text>
        </Container>
    );
}

export default Loader;
