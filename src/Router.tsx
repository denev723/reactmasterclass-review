import { Switch, Route } from "react-router-dom";
import Coin from "./routes/coinTracker/Coin";
import CoinTracker from "./routes/coinTracker/CoinTracker";
import Home from "./routes/Home";
import RecoilToDos from "./routes/recoilTodos/RecoilToDos";
import TrelloClone from "./routes/trelloClone/TrelloClone";
import Animation from "./routes/reactAnimation/Animation";
import Nomflix from "./routes/nomflix/Nomflix";

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
            <Route path={"/animation"}>
                <Animation />
            </Route>
            <Route path={"/nomflix-clone"}>
                <Nomflix />
            </Route>
        </Switch>
    );
}

export default Router;
