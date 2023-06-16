import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";


import { Bar } from "react-chartjs-2";
import style from "./styles/Chart.module.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);





export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: false,
            text: "Chart.js Bar Chart",
        },
    },
};



function ChartHome(props) {



    const labelsArray = props.data.map(item => item.title);
    const labelsData = props.data.map(item => item.count);
 
    
    const data = {
        labels:labelsArray,
        datasets: [
            {
                label: "Data Chart",
                data: labelsData,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };


    return (
        <>
            <div className={style.charts} >
                <Bar options={options} data={data} />
            </div>

        </>
    )
}

export default ChartHome