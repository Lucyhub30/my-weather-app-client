import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale, //x axis
    LinearScale, //y axis
    PointElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale, //x axis
    LinearScale, //y axis
    PointElement,
    Title,
    Tooltip,
    Filler,
    Legend
)
const HumidityGraph = () => {
    
    // Fetches data from the backend on port 8000
    async function update(){
        await fetch("http://localhost:8000/weatherData")  
        .then(async (res) => { 
        const data = await res.json();
        setMessage(data);
        
      })
    }

    //Connects to backend
    const [message, setMessage] = useState(""); 

    useEffect(() => {
        //Repeatedly calls the update() function at 30 second ```javascript
        update()
        const interval = setInterval(()=>{
            update()
        },30000)
        //Clears the interval
        return()=>clearInterval(interval)
    }, [])
    let timestamp = message?.weatherData?.slice(0,14).map(({timestamp})=>new Date(timestamp * 1000).toLocaleDateString()).reverse()
    let humidity = message?.weatherData?.slice(0,14).map(({humidity})=>humidity).reverse()
    
    
    
    
    const graphData = {
        labels: timestamp,
        datasets: [
            {
                fill: true,
                label: "% Humidity",
                data: humidity,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                
            },
            
           
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins:{
            maintainAspectRatio: false,
            title:{
                display: true,
                text: "Humidity Trends"
            },
            legend: {
                position: 'top'
            }
        },
        scales: {
            y:{
                min: 0,
                max: 100
            }
        }
    }
    
    
    return (        
        <div className="humidityGraph">
            <div className="humidityContent">
                <Line
                    data={graphData}
                    options={options}
                    

                ></Line>
            </div>
        </div>
    )
}

export default HumidityGraph