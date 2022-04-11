const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins?limit=100`).then((res) => res.json());
}

export function fetchCoin(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}
