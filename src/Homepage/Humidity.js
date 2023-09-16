//Import useState and useEffect
import React, { useState, useEffect } from "react"
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";



const Humidity = () =>{

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
        <div className="dataCircle lower">
            <div className="humidity"> {message?.weatherData?.slice(0, 1).map((item, idx) => {
            return (
                
                <div style={{ width: 120, height: 120 }} key={idx} >
                    <CircularProgressbarWithChildren 
                    value={parseInt(item.humidity)}  
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        textSize: '20px',
                        pathTransitionDuration: 0.5,
                        pathColor: `#306193`,
                        textColor: 'black',
                        trailColor: '#d6d6d6',
                        
                        
                      })}
                    >
                        <div className="dataText">Humidity
                        </div><div className="progressBarText">{item.humidity}%</div></CircularProgressbarWithChildren>              
                </div>
                
            )
            })}
            </div>
            
            
            
        </div>
        
       
    )
}

export default Humidity