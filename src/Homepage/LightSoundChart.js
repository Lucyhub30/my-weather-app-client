import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale, //x axis
    LinearScale, //y axis
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale, //x axis
    LinearScale, //y axis
    PointElement,
    Title,
    Tooltip,
    Legend
)
const LightSoundChart = () => {
    
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
    let timestamp = message?.weatherData?.slice(0,14).map(({timestamp})=>new Date(timestamp * 1000).toLocaleTimeString()).reverse()
    let sound = message?.weatherData?.slice(0,14).map(({sound})=>sound).reverse()
    let light = message?.weatherData?.slice(0,14).map(({light})=>light).reverse()
    
    
    const graphData = {
        labels: timestamp,
        datasets: [
            {
                label: "Sound",
                data: sound,
                backgroundColor: '#385fc2',
                borderColor: '#385fc2',
                borderWidth: 1
            },
            {
                label: "Light",
                data: light,
                backgroundColor: '#45a0a9',
                borderColor: '#45a0a9',
                borderWidth: 1
            },
           
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins:{
            maintainAspectRatio: false,
            title:{
                display: true,
                text: "Light and Sound"
            }
        },
        scales: {
            y:{
                min: 0,
                max: 3600
            }
        }
    }
    
    
    return (        
        <div className="lightSoundGraph">
            <div className="lightSoundgraphData">
                <Bar
                    data={graphData}
                    options={options}
                    className="lightSoundgraphContent"

                ></Bar>
            </div>
        </div>
    )
}

export default LightSoundChart