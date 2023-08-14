import React, { useState, useEffect } from "react";


const HistoryPage = () => {
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
        <div className="historyPage">
            <div className="pageContent">
                <h1 className="historyTitle">Weather History</h1>
                <div className="historyText">
                    <p className="PageLink">Welcome to Weather History! Here, you can find a log of all the data readings from your weather station. Want a more visual way of monitoring weather conditions? Check out the <a onClick={() => {window.location.pathname = "/"}}>main display</a>! </p>
                </div>
                <div>
                    <br/>
                    <div className="weatherReadings titles">
                        <div className="timestamp corner">
                            </div>
                        <div className="dataContent">
                        
                            <div className="dataColumn">Temperature</div>
                            <div className="dataColumn">Humidity</div>
                            <div className="dataColumn">Pressure</div>
                            <div className="dataColumn">Altitude</div>
                            <div className="dataColumn">Air Quality</div>
                            <div className="dataColumn">Dust Conc</div>
                            <div className="dataColumn">Light</div>
                            <div className="dataColumn">Sound</div>
                        </div>
                    </div>
                    
                    { message?.weatherData?.map((item, idx) => {
                        return (
                            <div key={idx} className="weatherReadings">
                                <div className="timestamp readings">
                                    <div className="timestamp-container">
                                        <div>{new Date(item.timestamp*1000).toDateString()}</div>
                                        <br></br>
                                        <div>{new Date(item.timestamp*1000).toTimeString()}</div>
                                    </div>
                                </div>
                                <div className="dataContent">
                                    <div className="dataColumn"><div className="tag">Temperature:&nbsp;</div>{item.temp}</div>
                                    <div className="dataColumn"><div className="tag">Humidity:&nbsp;</div>{item.humidity}</div>
                                    <div className="dataColumn"><div className="tag">Pressure:&nbsp;</div>{item.pressure}</div>
                                    <div className="dataColumn"><div className="tag">Altitude:&nbsp;</div>{item.altitude}</div>
                                    <div className="dataColumn"><div className="tag">Air Quality:&nbsp;</div>{item.airQual}</div>
                                    <div className="dataColumn"><div className="tag">Dust Concentration:&nbsp;</div>{item.dust_conc}</div>
                                    <div className="dataColumn"><div className="tag">Light:&nbsp;</div>{item.light}</div>
                                    <div className="dataColumn"><div className="tag">Sound:&nbsp;</div>{item.sound}</div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
export default HistoryPage;