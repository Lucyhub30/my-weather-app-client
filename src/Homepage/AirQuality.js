//Import useState and useEffect
import React, { useState, useEffect } from "react";
//Import speedometer component
import ReactSpeedometer from "react-d3-speedometer";


const AirQuality = () =>{

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

    function calcQualityMetric(quality) {
        let qual;
        //Assigns air quality value to each possible outcome
        switch (quality) {
            case 'Fresh Air':
                qual = 125 ;
                break;
            case 'Low Pollution':
                qual=375;
                break;
            case 'High Pollution':
                qual = 625;
                break;
            case 'Dangerous Level':
                qual = 870;
                break;
            default:
                qual = 0; 
                break;
        }
        return qual;
    }
    
    return(
        <div>
            <div className="airQuality"> {message?.weatherData?.slice(0, 1).map((item, idx) => {
            return (
                
                <div key={idx} >
                    <div><b>Air Quality Index</b></div>
                    <ReactSpeedometer
                        segments={4}
                        maxSegmentLabels={0}
                        needleColor="darkblue"
                        currentValueText={item.airQual}
                        needleHeightRatio={0.7}
                        textColor="black"
                        startColor="green"
                        endColor="hotpink"
                        valueTextFontSize="20px"
                        ringWidth={47}
                        height={190}
                        width={200}

                        airQuality={item.airQual}
                        //Assigns speedometer position value
                        
                        value={calcQualityMetric(item.airQual)}


                        />                            
                </div>
                
            )
            })}
            </div>
            
            
            
        </div>
        
       
    )
}

export default AirQuality