//Import useState and useEffect
import React, { useState, useEffect } from "react";
import MainDisplay from "./MainDisplay";
// Import required library to produce line graph
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

const PersonalisedPredictions = () => {
    
    // Fetches data from the backend on port 8000
    async function update(){
        //Fetch weather predictions
        try{
            await fetch("http://localhost:8000/predictions")  
            .then(async (res) => { 
                const data = await res.json();
                setPredictions(data);
            })
            

            //Fetch historical weather data
            await fetch("http://localhost:8000/weatherData")  
            .then(async (res) => { 
                const data = await res.json();
                setMessage(data);
        })
            
        } catch(error){
            console.warn(error)
        }
        
    }

    useEffect(() => {
        //Repeatedly calls the update() function at 30 second ```javascript
        
        update()
        
        const interval = setInterval(()=>{
            update()
        },60000)
        //Clears the interval
        return()=>clearInterval(interval)
    }, [])

    //Connects to backend
    const [myPredictions, setPredictions] = useState(""); 
    const [message, setMessage] = useState("");

    

    function calcDayOfWeek(dayValue) {
        let qual;
        //Assigns day off week value to day
        while (dayValue>6){
            dayValue=dayValue-7
        }
        switch (dayValue) {
            case 0:
                qual = "SUN" ;
                break;
            case 1:
                qual= "MON";
                break;
            case 2:
                qual= "TUE";
                break;
            case 3:
                qual = "WED";
                break;
            case 4:
                qual = "THU";
                break;
            case 5:
                qual = "FRI";
                break;
            case 6:
                qual =  "SAT";
                break;
            default:
                qual = "error?"; 
                break;
        }
        return qual;
    }


    
    //Finds maximum temperature in the last 24 hours
    let maxTemp = message === "" ? undefined : [Math.max(...message?.weatherData?.slice(0,24).map(({temp})=>temp))]

    //Finds minimum temperature in the last 24 hours
    let minTemp = message === "" ? undefined : [Math.min(...message?.weatherData?.slice(0,24).map(({temp})=>temp))]

    //Makes a list of the predicted minimum temperatures over the next 10 days
    let predictedMinTemp = myPredictions?.predictions?.slice(0,10).map(({TMIN})=>TMIN)

    //Makes a list of the predicted maximum temperatures over the next 10 days
    let predictedMaxTemp = myPredictions?.predictions?.slice(0,10).map(({TMAX})=>TMAX)
    
    //Sets today's date
    let todayDate = new Date();

    //Sets the numeric value for the current day of the week
    let dayOfWeek = todayDate.getDay();

    //Assigns the word day of the week to the correct label
    let thirdLabel = calcDayOfWeek(dayOfWeek+2)
    let fourthLabel = calcDayOfWeek(dayOfWeek+3)
    let fithLabel = calcDayOfWeek(dayOfWeek+4)
    let sixthLabel = calcDayOfWeek(dayOfWeek+5)
    let seventhLabel = calcDayOfWeek(dayOfWeek+6)

    //Set options and data for graph
    const graphData = {
        
        labels: ["TODAY","TOMORROW",thirdLabel,fourthLabel,fithLabel,sixthLabel,seventhLabel],
        datasets: [
            {
                label: "Minimum Temp",
                data: minTemp?.concat(predictedMinTemp),
                backgroundColor: 'lightblue',
                borderColor: 'lightblue',
                pointBorderColor: 'lightblue',
                tension: 0.4,
    
            },
            {
                label: "Maximum Temp",
                data: maxTemp?.concat(predictedMaxTemp),
                backgroundColor: 'red',
                borderColor: 'red',
                pointBorderColor: 'red',
                tension: 0.4,
    
            }
        ]
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
                text: "Personalised Predictions - Temperature"
            }
        },
        scales: {
            y:{
                min: Math.min.apply(Math, minTemp?.concat(predictedMinTemp)) -1,
                max: Math.max.apply(Math, maxTemp?.concat(predictedMaxTemp)) +1
            }
        }
    
    }



    
    return (
        <div className = "predictionGraphContent">
            <div className="graphContentPredictions">
                <Line
                    data={graphData}
                    options={options}
                    className="predictionsGraph"

                ></Line>
            </div>
        </div>
       
    )

}

export default PersonalisedPredictions