//Import useState and useEffect
import React, { useState, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const Light = () =>{

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
            <div className="dataCircle"> {message?.weatherData?.slice(0, 1).map((item, idx) => {
            return (
                
    
                
                <div key={idx} style={{ width: 120, height: 120 }}  >
                    <CircularProgressbarWithChildren 
                    value={parseInt(item.light)}  
                    maxValue={2500}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '20px',
                        pathTransitionDuration: 0.5,
                        pathColor: `#306193`,
                        textColor: 'black',
                        trailColor: '#d6d6d6',
                        
                      })}
                    >
                        <div className="dataText">Light Level
                        </div><div className="progressBarText">{item.light}</div></CircularProgressbarWithChildren>              
                </div>
                
            )
            })}
            </div>
                 
        </div>     
                
            
            

        
       
    )
}

export default Light