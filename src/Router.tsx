import { Switch, Route } from "react-router-dom";
import Coin from "./routes/coinTracker/Coin";
import CoinTracker from "./routes/coinTracker/CoinTracker";
import Home from "./routes/Home";
import RecoilToDos from "./routes/recoilTodos/RecoilToDos";
import TrelloClone from "./routes/trelloClone/TrelloClone";

function Router() {
    return (
        <Switch>
            <Route exact path={"/"}>
                <Home />
            </Route>
            <Route exact path={"/coin-tracker"}>
                <CoinTracker />
            </Route>
            <Route path={"/coin-tracker/:coinId"}>
                <Coin />
            </Route>
            <Route path={"/recoil-todos"}>
                <RecoilToDos />
            </Route>
            <Route path={"/trello-clone"}>
                <TrelloClone />
            </Route>
        </Switch>
    );
}

export default Router;
