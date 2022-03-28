const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins?limit=100`).then((res) => res.json());
}
