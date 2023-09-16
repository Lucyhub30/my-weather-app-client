//Import useState and useEffect
import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeatherPredictions = () => {
    

    // Fetches data from the backend on port 8000
    async function update(){
        try{
            await fetch("http://localhost:8000/predictions")  
            .then(async (res) => { 
            const data = await res.json();
            setPredictions(data)})
            
        } catch(error){
            console.warn(error)
            const notifyPredictions = () => toast.warn("Insufficient data to make weather predictions");
            notifyPredictions()
        }
        

    }

    //Connects to backend
    const [myPredictions, setPredictions] = useState(""); 

    useEffect(() => {
        //Repeatedly calls the update() function at 30 second ```javascript
        update()
        const interval = setInterval(()=>{
            update()
        },60000)
        //Clears the interval
        return()=>clearInterval(interval)
    }, [])

    
    var today = new Date()
    var day = today.getDay()

    

    function calcDayOfWeek(dayValue) {
        let qual;
        //Assigns day off week value to day
        while (dayValue>6){
            dayValue=dayValue-7
        }
        switch (dayValue) {
            case 0:
                qual = "Sun" ;
                break;
            case 1:
                qual= "Mon";
                break;
            case 2:
                qual= "Tue";
                break;
            case 3:
                qual = "Wed";
                break;
            case 4:
                qual = "Thu";
                break;
            case 5:
                qual = "Fri";
                break;
            case 6:
                qual =  "Sat"
                break;
            default:
                qual = "error?"; 
                break;
        }
        return qual;
    }
    
    var date = new Date();
    var numericDay = date.getDate(); 
    var valueOfDay = date.getDay();
    
    return(
        <div className="weatherPredictions">
            
            <p className="weatherPredictionsText">Weather Forecast (14-days)</p>
            <div className="dataPredictionsContent columnTitles">
                <div>Day</div>
                <div>Date</div>
                <div>Rainfall (mm)</div>
                <div>Minimum Temp</div>
                <div>Maximum Temp</div>
                
            </div>
            <div className="weatherPredictionsText">
                {myPredictions?.predictions?.map((item, idx) => {

                    //Calculates today's date
                    numericDay+=1
                    valueOfDay+=1
                    
                    let weeklyDay = calcDayOfWeek(valueOfDay)

                    let month = date.getMonth()
                    let year = date.getFullYear()

                    //If the month has 31 days
                    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11){
                        //If the day is above 31
                        if (numericDay>31){
                            numericDay=numericDay-31;
                        }
                    }
                    //If the month has 30 days
                    if (month == 3 || month == 5 || month == 8 || month == 10){
                        //If the day is above 30
                        if (numericDay>30){
                            numericDay=numericDay-30;
                        }
                    }

                    //If the month is feb
                    //If the month has 30 days
                    if (month == 1){
                        //If it is a leap year
                        //It is a leap year when:
                        //Either it is divided by 4 but not 100
                        //It is divided by 400

                        if ((year%4==0) && (year%100!=0)){
                            //It is a leap year
                            if (numericDay>29){
                                numericDay=numericDay-29;
                            }
                        }
                        else if (year%400==0){
                            //It is a leap year
                            if (numericDay>29){
                                numericDay=numericDay-29;
                            }
                        }
                        //If it is not a leap year
                        else {
                            if (numericDay>28){
                                numericDay=numericDay-28;
                            }
                        }
                    }

                    return (
                        <div key={idx} className="">
        
                            <div className="dataPredictionsContent">
                                <div className="dataPredictions">{weeklyDay}</div>
                                <div className="dataPredictions">{numericDay}</div>
                                <div className="dataPredictions">{Math.round(item.PRCP*1000)/1000}</div>
                                <div className="dataPredictions">{Math.round(item.TMIN)}</div>
                                <div className="dataPredictions">{Math.round(item.TMAX)}</div>
                                
                                
                            </div>
                        </div>
                    )
                    

                })}
            </div>
            
        </div>
    );
}
export default WeatherPredictions;