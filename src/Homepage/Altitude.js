//Import useState and useEffect
import React, { useState, useEffect } from "react";

const Altitude = () =>{

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

    
    return(
        <div>
            <div className="dataCircle "> {message?.weatherData?.slice(0, 1).map((item, idx) => {
            return (
                
                <div className="dataContainer"key={idx} >
                    <div className="dataVal">
                        <div className="dataContents">
                            <div className="dataText">Altitude</div>
                            {item.altitude}m
                        </div>
                        
                    </div>                      
                </div>
                
            )
            })}
            </div>
            
            
            
        </div>
        
       
    )
}

export default Altitude