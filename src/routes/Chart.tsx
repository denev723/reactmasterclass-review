import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchHistory } from "../api";
import Loader from "../components/Loader";
import ApexChart from "react-apexcharts";

const Container = styled.div``;

interface ChartProps {
    coinId: string;
}

interface IHistory {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistory[]>(
        ["history", coinId],
        () => fetchHistory(coinId),
        {
            refetchInterval: 10000
        }
    );

    return (
        <Container>
            {isLoading ? (
                <Loader>Loading Chart...</Loader>
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => price.close) ?? []
                        }
                    ]}
                    options={{
                        theme: {
                            mode: "light"
                        },
                        subtitle: {
                            text: "Close Price Chart",
                            margin: 50
                        },
                        markers: {
                            size: 7
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "transparent"
                        },
                        grid: { show: true },
                        stroke: {
                            curve: "straight",
                            width: 4
                        },
                        yaxis: {
                            show: true,
                            labels: {
                                style: {
                                    colors: ["#222"]
                                },
                                formatter: function (val, index) {
                                    return val.toFixed(0);
                                }
                            }
                        },
                        xaxis: {
                            axisBorder: { show: true },
                            axisTicks: { show: true },
                            labels: {
                                show: true,
                                style: { colors: "#222222" }
                            },
                            type: "datetime",
                            categories: data?.map((price) =>
                                price.time_close.slice(6, 10)
                            )
                        }
                    }}
                />
            )}
        </Container>
    );
}

export default Chart;
