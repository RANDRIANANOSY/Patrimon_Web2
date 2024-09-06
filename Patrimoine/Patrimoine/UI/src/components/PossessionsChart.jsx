import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

function PossessionsChart({ data }) {
const chartData = {
    labels: data.map(item => item.libelle),
    datasets: [
    {
        label: 'Valeur des possessions',
        data: data.map(item => item.valeur),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.1, 
    },
    ],
};

const options = {
    responsive: true,
    plugins: {
    legend: {
        position: 'top',
    },
    tooltip: {
        callbacks: {
        label: function (tooltipItem) {
            return `Valeur: ${tooltipItem.raw}`;
        },
        },
    },
    },
    scales: {
    x: {
        title: {
        display: true,
        text: 'Libelle',
        },
    },
    y: {
        title: {
        display: true,
        text: 'Valeur',
        },
        beginAtZero: true,
    },
    },
};

return <Line data={chartData} options={options} />;
}

export default PossessionsChart;