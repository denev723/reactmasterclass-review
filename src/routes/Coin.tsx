import { useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import Loader from "../components/Loader";

const Container = styled.div`
    max-width: 720px;
    margin: auto;
`;

const Title = styled.h2`
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    margin-top: 80px;
    margin-bottom: 50px;
`;

interface IParams {
    coinId: string;
}

interface ILocation {
    name: string;
}

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<IParams>();
    const { state } = useLocation<ILocation>();

    console.log(coinId);

    return (
        <Container>
            <Title>{state?.name || coinId}</Title>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    );
}

export default Coin;
