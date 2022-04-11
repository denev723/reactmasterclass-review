import { useQuery } from "react-query";
import { Route, useHistory, useLocation, useParams } from "react-router-dom";
import { fetchCoin } from "../api";

interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

function Coin() {
    const { state } = useLocation<RouteState>();
    const { coinId } = useParams<RouteParams>();

    const { isLoading, data } = useQuery("tickers", fetchCoin(coinId));

    console.log(data);

    return <h1>Coin</h1>;
}

export default Coin;
