//Import useState and useEffect
import React, { useState, useEffect } from "react";

const AboutPage = () => {
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


    //The values of these variables will change depending on the connection with the weather station
    let connection_status

    //Timestamp of most recent message
    let dataTimestamp = message?.weatherData?.slice(0,1).map(({timestamp})=>timestamp*1000).reverse();
    
    //Current timestamp
    let nowTimestamp = Date.now()

    //Checks whether last reading was taken within 2 hours
    if ((nowTimestamp-dataTimestamp)<=7200000){
        connection_status = "ACTIVE";
    }
    else {
        connection_status = "OFFLINE";
    }
    
    
    


    return(
        <div className="aboutPage">
            <div className="pageContent">
                <h1 className="aboutTitle">About Your Weather Station</h1>
                
                <div className="aboutText"><p>This app collects and displays data collected directly by your weather station. </p>
                <p>The main display on the home screen includes temperature, humidity, air pressure, estimated altitude, dust concentration, light and sound readings from your local environment.</p>
                <p >Visit the <a className="pageLink"onClick={() => {window.location.pathname = "/"}}>user intstructions</a> page for more information on how to set up your weather station.</p></div>
                <div className="aboutInfo">
                    <div className="aboutInfoContent" ><div className="aboutLog"><p>Connection Status - <b>{connection_status}</b></p> </div></div>
                    <div className="aboutInfoContent" ><div className="aboutLog"><p>Weather data last recieved - <b>{message?.weatherData?.slice(0,1).map((item, idx)=>{
                        return (
                            <div key={idx} > 
                                {new Date(item.timestamp*1000).toLocaleDateString()}&nbsp;at&nbsp;{new Date(item.timestamp*1000).toLocaleTimeString()}
                            </div>
                        )
                    })}</b></p> 
                    </div></div>
                    <div className="aboutInfoContent" ><div className="aboutLog"><p>Weather station first activated - <b>{message?.weatherData?.reverse().slice(0,1).map((item, idx)=>{
                        return (
                            <div key={idx} > 
                                {new Date(item.timestamp*1000).toLocaleDateString()}&nbsp;at&nbsp;{new Date(item.timestamp*1000).toLocaleTimeString()}
                            </div>
                        )
                    })}</b></p> 
                    </div></div>
                    <p>The weather station is 'ACTIVE' if data has been recieved within 2 hours.</p>
                    <p>Having trouble setting up the weather station? </p>
                    <p className="pageLink">Visit the help page <a onClick={() => {window.location.pathname = "/help"}}>here</a>.</p>
                </div>
            
                <br/>
            </div>
        </div>
    );
}
export default AboutPage;