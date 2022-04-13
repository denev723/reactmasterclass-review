import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";
import coinImg from "../images/coin-img.png";

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

const CoinList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
`;

const CoinItem = styled.li`
    border: 1px solid ${(props) => props.theme.lineColor};
    border-radius: 6px;
    height: 50px;
    padding: 0 10px;

    :hover {
        background-color: #0092c4;
    }

    a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;

        .title {
            display: inline-block;
            position: relative;
            padding-left: 40px;
        }

        .title::before {
            content: "";
            background-image: url(${coinImg});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            width: 30px;
            height: 30px;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
    }
`;

interface IData {
    id: string;
    is_active: boolean;
    is_new: boolean;
    name: string;
    rank: number;
    symbol: string;
    type: string;
}

function CoinTracker() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IData[]>([]);
    const fetchData = async () => {
        const reponse = await fetch("https://api.coinpaprika.com/v1/coins");
        const json = await reponse.json();
        setLoading(false);
        setData(json.slice(0, 100));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <Title>Coin Tracker</Title>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinList>
                    {data.map((item) => (
                        <CoinItem key={item.id}>
                            <Link
                                to={{
                                    pathname: `/coin-tracker/${item.id}`,
                                    state: { name: item.name }
                                }}>
                                <span className="title">{item.name}</span>
                                <span>&rarr;</span>
                            </Link>
                        </CoinItem>
                    ))}
                </CoinList>
            )}
        </Container>
    );
}

export default CoinTracker;
