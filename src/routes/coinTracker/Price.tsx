import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPrice } from "../../api";
import Loader from "../../components/Loader";

const Container = styled.div``;

const List = styled.ul`
    margin-top: 30px;
`;

const Item = styled.li<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.coinOverviewColor};
    padding: 20px 20px;
    border-radius: 10px;
    margin-bottom: 15px;

    span {
        width: 100%;
    }

    :not(:first-child) {
        span:last-child {
            color: ${(props) => (props.isActive ? "#1eff05" : "#fc2d2d")};
        }
    }
`;

interface PriceProps {
    coinId: string;
}

interface IPrice {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_15m: number;
            percent_change_30m: number;
            percent_change_1h: number;
            percent_change_6h: number;
            percent_change_12h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            percent_change_30d: number;
            percent_change_1y: number;
            ath_price: number;
            ath_date: string;
            percent_from_price_ath: number;
        };
    };
}

function testVal(val: number | undefined) {
    if (val) {
        return val > 0;
    }
}

function Price({ coinId }: PriceProps) {
    const { isLoading, data: price } = useQuery<IPrice>(
        ["price", coinId],
        () => fetchPrice(coinId),
        {
            refetchInterval: 10000
        }
    );

    return (
        <Container>
            {isLoading ? (
                <Loader>Data Loading...</Loader>
            ) : (
                <List>
                    <Item isActive={testVal(price?.quotes.USD.price) === false}>
                        <span>Price:</span>
                        <span>$ {price?.quotes.USD.price.toFixed(2)}</span>
                    </Item>
                    <Item
                        isActive={
                            testVal(price?.quotes.USD.market_cap_change_24h) ===
                            true
                        }>
                        <span>Market cap change 24h:</span>
                        <span>{price?.quotes.USD.market_cap_change_24h} %</span>
                    </Item>
                    <Item
                        isActive={
                            testVal(price?.quotes.USD.percent_change_30m) ===
                            true
                        }>
                        <span>Percent Change(last 30m):</span>
                        <span>{price?.quotes.USD.percent_change_30m} %</span>
                    </Item>
                    <Item
                        isActive={
                            testVal(price?.quotes.USD.percent_change_1h) ===
                            true
                        }>
                        <span>Percent Change(last 1h):</span>
                        <span>{price?.quotes.USD.percent_change_1h} %</span>
                    </Item>
                    <Item
                        isActive={
                            testVal(price?.quotes.USD.percent_change_12h) ===
                            true
                        }>
                        <span>Percent Change(last 12h):</span>
                        <span>{price?.quotes.USD.percent_change_12h} %</span>
                    </Item>
                    <Item
                        isActive={
                            testVal(price?.quotes.USD.percent_change_24h) ===
                            true
                        }>
                        <span>Percent Change(last 24h):</span>
                        <span>{price?.quotes.USD.percent_change_24h} %</span>
                    </Item>
                </List>
            )}
        </Container>
    );
}

export default Price;
