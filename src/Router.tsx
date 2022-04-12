import { Switch, Route } from "react-router-dom";
import CoinTracker from "./routes/CoinTracker";
import Home from "./routes/Home";
import TrelloClone from "./routes/TrelloClone";

function Router() {
    return (
        <Switch>
            <Route exact path={"/"}>
                <Home />
            </Route>
            <Route path={"/coin-tracker"}>
                <CoinTracker />
            </Route>
            <Route path={"/trello-clone"}>
                <TrelloClone />
            </Route>
        </Switch>
    );
}

export default Router;
