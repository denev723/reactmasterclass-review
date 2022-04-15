// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
    useLocation,
    useParams,
    useRouteMatch,
    Switch,
    Route
} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { fetchInfo, fetchPrice } from "../api";
import Loader from "../components/Loader";
import Chart from "./Chart";
import Price from "./Price";

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
    position: relative;
    color: ${(props) => props.theme.coinFontColor};
`;

const SubTitle = styled.h4`
    font-size: 24px;
    margin-bottom: 15px;
    color: ${(props) => props.theme.coinFontColor};
`;

const ListBtn = styled(Link)`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 36px;
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.coinFontColor};
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.theme.coinOverviewColor};
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props) => props.theme.coinFontColor};

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
    color: ${(props) => props.theme.coinFontColor};
`;

const Tabs = styled.ul`
    display: flex;
    margin-top: 100px;
`;

const Tab = styled.li<{ active: boolean }>`
    width: 100%;
    height: 50px;
    border: 1px solid ${(props) => props.theme.lineColor};
    background-color: ${(props) =>
        props.active ? props.theme.coinMenu : props.theme.coinMenuColor};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-align: center;
        color: ${(props) =>
            props.active ? props.theme.coinFont : props.theme.coinFontColor};
    }
`;

interface IParams {
    coinId: string;
}

interface ILocation {
    name: string;
}

interface IInfoProps {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    hardware_wallet: boolean;
    started_at: string;
    development_status: string;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceProps {
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
            ath_price: number;
            ath_date: string;
            percent_from_price_ath: number;
        };
    };
}

function Coin() {
    const { coinId } = useParams<IParams>();
    const { state } = useLocation<ILocation>();
    const priceMatch = useRouteMatch("/coin-tracker/:coinId/price");
    const chartMatch = useRouteMatch("/coin-tracker/:coinId/chart");
    // const [loading, setLoading] = useState(true);
    // const [info, setInfo] = useState<IInfoProps>();
    // const [price, setPrice] = useState<IPriceProps>();

    // useEffect(() => {
    //     // 즉시 실행 함수
    //     (async () => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();

    //         setInfo(infoData);
    //         setPrice(priceData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);

    const { isLoading: infoLoading, data: info } = useQuery<IInfoProps>(
        ["info", coinId],
        () => fetchInfo(coinId)
    );
    const { isLoading: priceLoading, data: price } = useQuery<IPriceProps>(
        ["price", coinId],
        () => fetchPrice(coinId)
    );

    const loading = infoLoading || priceLoading;

    return (
        <>
            <Helmet>
                <title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading..."
                        : info?.name}
                </title>
            </Helmet>
            <Container>
                <Title>
                    {state?.name || info?.name}
                    <ListBtn to={"/coin-tracker"}>&larr;</ListBtn>
                </Title>
                {loading ? (
                    <Loader>Loading...</Loader>
                ) : (
                    <>
                        <SubTitle>Coin info</SubTitle>
                        <Overview>
                            <OverviewItem>
                                <span>rank:</span>
                                <span>{info?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>symbol:</span>
                                <span>{info?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Price:</span>
                                <span>
                                    {price?.quotes.USD.price.toFixed(2)}
                                </span>
                            </OverviewItem>
                        </Overview>
                        <Description>{info?.description}</Description>
                        <Overview>
                            <OverviewItem>
                                <span>Total Supply:</span>
                                <span>{price?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Max Supply:</span>
                                <span>{price?.max_supply}</span>
                            </OverviewItem>
                        </Overview>
                        <Tabs>
                            <Tab active={priceMatch !== null}>
                                <Link to={`/coin-tracker/${coinId}/price`}>
                                    Price
                                </Link>
                            </Tab>
                            <Tab active={chartMatch !== null}>
                                <Link to={`/coin-tracker/${coinId}/chart`}>
                                    Chart
                                </Link>
                            </Tab>
                        </Tabs>
                        <Switch>
                            <Route path={`/coin-tracker/:coinId/price`}>
                                <Price coinId={coinId} />
                            </Route>
                            <Route path={`/coin-tracker/:coinId/chart`}>
                                <Chart coinId={coinId} />
                            </Route>
                        </Switch>
                    </>
                )}
            </Container>
        </>
    );
}

export default Coin;
