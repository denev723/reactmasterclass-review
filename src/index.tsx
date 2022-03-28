import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
