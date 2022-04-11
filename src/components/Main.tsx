import { Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isActiveAtom } from "../atoms";
import Header from "../components/Header";
import Coin from "../routes/Coin";
import CoinTracker from "../routes/CoinTracker";
import Home from "../routes/Home";
import TrelloClone from "../routes/TrelloClone";

const Container = styled.div<{ isActive: boolean }>`
    margin-left: ${(props) => (props.isActive ? "300px" : 0)};
`;

function Main() {
    const isActive = useRecoilValue(isActiveAtom);
    return (
        <Container isActive={isActive}>
            <Header />
            <Switch>
                <Route exact path={"/"}>
                    <Home />
                </Route>
                <Route exact path={"/coin"}>
                    <CoinTracker />
                </Route>
                <Route path={"/coin/:coinId"}>
                    <Coin />
                </Route>
                <Route path={"/trello"}>
                    <TrelloClone />
                </Route>
            </Switch>
        </Container>
    );
}

export default Main;
