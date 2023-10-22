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
const DustGraph = () => {
    
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
    let timestamp = message?.weatherData?.slice(0,14).map(({timestamp})=>new Date(timestamp * 1000).toLocaleTimeString()).reverse()
    let dust = message?.weatherData?.slice(0,14).map(({dust_conc})=>dust_conc).reverse()
    
    
    
    
    const graphData = {
        labels: timestamp,
        datasets: [
            {
                fill: true,
                label: "pcs/L dust",
                data: dust,
                borderColor: '#c25838',
                backgroundColor: 'rgb(219, 155, 136, 0.5)',
                
            },
            
           
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins:{
            maintainAspectRatio: false,
            title:{
                display: true,
                text: "Dust Readings"
            },
            legend: {
                position: 'top'
            }
        },
        scales: {
            y:{
                min: 0,
                max: Math.max.apply(Math,dust) > 0 ? Math.max.apply(Math,dust) *1.2 : 10
            }
        }
    }
    
    
    return (        
        <div className="dustGraph">
            <div className="dustContent">
                <Line
                    data={graphData}
                    options={options}
                    

                ></Line>
            </div>
        </div>
    )
}

export default DustGraph