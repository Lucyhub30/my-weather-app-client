import React, { useState, useEffect } from "react";

const MainDisplay = () => {

    //Assigns values outside tags so that they can be changed later
    const title = "Your Weather Station";
    
    
    var weatherConditions = "Sunny"
    
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
        update()
        const interval = setInterval(()=>{
            update()
        },30000)
        return()=>clearInterval(interval)
    }, [])



    return(
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
                                <div>
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
    );
}
export default MainDisplay;