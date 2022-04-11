import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import coinImg from "../images/coin-img.png";

const Container = styled.div`
    max-width: 720px;
    margin: auto;
    padding: 50px 0;
`;

const Loader = styled.p``;

const TitleWrapper = styled.div`
    margin-bottom: 50px;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 24px;
`;

const GridWrapper = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
`;

const GridItem = styled.li`
    a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        color: #222;
        font-size: 20px;
        padding: 10px;
        font-weight: bold;
        border: 1px solid #c9c9c9;
        border-radius: 8px;

        &:hover {
            background-color: #ccccff;
            border-color: #222;
        }
    }
`;

const Img = styled.img`
    width: 50px;
`;

interface ICoins {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function CoinTracker() {
    const { isLoading, data } = useQuery<ICoins[]>("coinList", fetchCoins);
    const coins = data?.slice(0, 100);
    return (
        <Container>
            <TitleWrapper>
                <Title>Coin Tracker</Title>
            </TitleWrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <GridWrapper>
                    {coins?.map((coin) => (
                        <GridItem key={coin.id}>
                            <Link
                                to={{
                                    pathname: `/coin/${coin.id}`,
                                    state: { name: coin.name }
                                }}>
                                <Img src={coinImg} alt="코인 이미지" />
                                <span>{coin.name}</span>
                                <span>&rarr;</span>
                            </Link>
                        </GridItem>
                    ))}
                </GridWrapper>
            )}
        </Container>
    );
}

export default CoinTracker;
