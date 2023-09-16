import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, //x axis
    LinearScale, //y axis
    PointElement,
    Title,
    Legend
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Legend
)
const TempGraph = () => {
    
    // Fetches data from the backend on port 8000
    async function update(){
        try{
            await fetch("http://localhost:8000/weatherData")  
            .then(async (res) => { 
            const data = await res.json();
            setMessage(data)})
            
        } catch(error){
            console.warn(error)
        }
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
    let timestamp = message?.weatherData?.slice(0,23).map(({timestamp})=>new Date(timestamp * 1000).toLocaleTimeString()).reverse()
    let temp = message?.weatherData?.slice(0,23).map(({temp})=>temp).reverse()
    
    const graphData = {
        
        labels: timestamp,
        datasets: [{
            label: "Temperature",
            data: temp,
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointBorderColor: 'orange',
            tension: 0.4,
    
        }]
    }
    
    const options = {
        
        maintainAspectRatio: false,
        plugins:{
            legend: {
                labels: {
                    boxwidth:0,
                }
            },
            title:{
                display: true,
                text: "Today's Trends in Temperature"
            }
        },
        scales: {
            y:{
                min: Math.min.apply(Math,temp) -1,
                max: Math.max.apply(Math,temp) +1
            }
        }
    }
    return (        
        <div className="tempGraph">
            <div className="graphData">
                <Line
                    data={graphData}
                    options={options}
                    className="graphContent"

                ></Line>
            </div>
        </div>
    )
}

export default TempGraph