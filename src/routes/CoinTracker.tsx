import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div``;

const TitleWrapper = styled.div``;

const Title = styled.h2``;

const Loader = styled.p``;

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
                <ul>
                    {coins?.map((coin) => (
                        <li key={coin.id}>
                            <Link to={`/${coin.id}`}>{coin.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
}

export default CoinTracker;
