import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import LoadingSpinner from '../../Components/LoadingSpinner';

const Statistics = () => {
    const { data: statistics = [], isLoading } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/articles-req`);
            return data;
        }
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="text-center my-10 md:my-20">
                <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }

    const publisherCounts = statistics.reduce((acc, stat) => {
        const publisher = stat.publisher;
        if (acc[publisher]) {
            acc[publisher]++;
        } else {
            acc[publisher] = 1;
        }
        return acc;
    }, {});

    const totalArticles = Object.values(publisherCounts).reduce((acc, count) => acc + count, 0);
    const pieChartData = Object.entries(publisherCounts).map(([publisher, count]) => {
        const percentage = ((count / totalArticles) * 100).toFixed(2);
        return [publisher, parseFloat(percentage)];
    });

    const dataForChart = [
        ['Publisher', 'Percentage'],
        ...pieChartData
    ];

    const barChartData = [
        ['Publisher', 'Article Count'],
        ...Object.entries(publisherCounts).map(([publisher, count]) => [publisher, count]),
    ];

    const articlesByDate = statistics.reduce((acc, stat) => {
        const date = new Date(stat.date).toLocaleDateString();
        if (acc[date]) {
            acc[date]++;
        } else {
            acc[date] = 1;
        }
        return acc;
    }, {});

    const lineChartData = [
        ['Date', 'Article Count'],
        ...Object.entries(articlesByDate).map(([date, count]) => [date, count]),
    ];

    const areaChartData = [
        ['Date', 'Cumulative Article Count'],
    ];

    let cumulativeCount = 0;
    Object.entries(articlesByDate)
        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)) 
        .forEach(([date, count]) => {
            cumulativeCount += count;
            areaChartData.push([date, cumulativeCount]);
        });

    return (
        <div className="max-w-screen-xl mx-5 md:mx-auto my-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 my-12">
                {/* Pie Chart */}
                <div className="col-span-1">
                    <Chart
                        chartType="PieChart"
                        data={dataForChart}
                        width="100%"
                        height="400px"
                        options={{
                            title: 'Article Distribution by Publisher',
                            is3D: true,
                            slices: {
                                0: { offset: 0.1 },
                                1: { offset: 0.1 },
                                2: { offset: 0.1 },
                            },
                        }}
                    />
                </div>

                {/* Bar Chart */}
                <div className="col-span-1">
                    <Chart
                        chartType="BarChart"
                        data={barChartData}
                        width="100%"
                        height="400px"
                        options={{
                            title: 'Article Count by Publisher',
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: 'Total Articles',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Publisher',
                            },
                        }}
                    />
                </div>
            </div>

            {/* Area Chart */}
            <div className="my-12">
                <Chart
                    chartType="AreaChart"
                    data={areaChartData}
                    width="100%"
                    height="400px"
                    options={{
                        title: 'Cumulative Article Count Over Time',
                        hAxis: {
                            title: 'Date',
                            format: 'MM/dd/yyyy',
                        },
                        vAxis: {
                            title: 'Cumulative Articles',
                        },
                        legend: { position: 'none' },
                    }}
                />
            </div>
        </div>
    );
};

export default Statistics;
