import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainDisplay = () => {
    //Creates notification to inform user of errors
    

    //Assigns values outside tags so that they can be changed later
    const title = "Your Weather Station";
    
    
   var showData = true
    
    async function update(){
        
        try{
            await fetch("http://localhost:8000/weatherData")  
            .then(async (res) => { 
                if (!res.ok) {
                    const error = 'Weatherdata responded with: ' + res.status + ' ' + res.statusText
                    throw error
                }
            const data = await res.json();
            
            if (data.weatherData.length == 0){
                const notifyYourData = () => toast.info("Welcome to your weather station!");
                const notifySetup = () => toast.info("Head over to the help page to start setting up your weather system! (The ? icon)");
                showData = false
                notifyYourData()
                notifySetup()
            } else{
                showData = true
            }
            
            
            setMessage(data)})
        } catch(error){
            console.warn(error)
            const notifyWeatherData = () => toast.error("Unable to connect to server and retrieve weather data. Please restart the server and try again.");
            notifyWeatherData()
        }
        
        //Get current weather conditions
        async function getConditions(){
            try{
                let response = await fetch("http://api.weatherapi.com/v1/current.json?key=915eec29b4cf4596810115908230209&q=Cirencester&aqi=no")
                if (!response.ok) {
                    const error = 'Predictions responded with: ' + response.status + ' ' + response.statusText
                    throw error
                }
                let edit_response = await response.json()
                return edit_response
            } catch(error){
                console.warn(error)
                const notifyConditions = () => toast.error("Unable to collect current weather conditions. Retrying in 30 seconds.");
                notifyConditions()
            }
            
        }
        if (showData){
            var edit_response = getConditions().then(function(edit_response){
                try{
                let weatherConditions = edit_response["current"]["condition"]["text"]
                setCondition(weatherConditions)
                } catch(error){
                    console.warn(error)
                }})
        }
        
        
        
        
            
        
        
      
    }
    //Connects to backend
    const [message, setMessage] = useState(""); 
    const [weatherConditions, setCondition] = useState(""); 
    
    
        
    useEffect(() => {
        update()
        const interval = setInterval(()=>{
            update()
        },60000)
        return()=>clearInterval(interval)
    }, [])


    
    return(
        <div>
            <ToastContainer
                    autoClose={10000}
                />
            <div className="mainDisplay">
            
                <div className="displayedConditions">
                    <h1>{title}</h1>
                    <div className="timestampHome"> The last weather update: {message?.weatherData?.slice(0, 1).map((item, idx) => {
                            return (
                                <div key={idx} >
                                    
                                    {new Date(item.timestamp*1000).toLocaleDateString()}&nbsp;at&nbsp;{new Date(item.timestamp*1000).toLocaleTimeString()}
                                    
                                    
                                </div>
                            )
                        })}</div>
                    <br></br>
                    <div className="mainDisplayContent">
                        
                        <div>
                        { message?.weatherData?.slice(0, 1).map((item, idx) => {
                            return (
                                <div key={idx} className="temperature">
                                    <div className="innerTemp">
                                        {item.temp}°
                                    </div>
                                    
                                </div>
                            )
                        })}
                        </div>
                        </div>
                </div>
                <div className="weather">
                    <div className="weatherConditions">
                        <p>{weatherConditions}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainDisplay;