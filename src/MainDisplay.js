//import {useState} from 'react';

const MainDisplay = () => {

    //Assigns values outside tags so that they can be changed later
    const title = "Your Weather Station";
    var lastUpdate = 5;
    let temp = 20;
    var weatherConditions = "Sunny"
    
    return(
        <div className="mainDisplay">
            
            <div className="displayedConditions">
                <h1>{title}</h1>
                <p> App last updated {lastUpdate} minutes ago</p>
                <br></br>
                <div className="mainDisplayContent">
                    
                    <div className="temperature">
                        <p>{temp} °C</p>
                    </div>
                    </div>
            </div>

            <div className="weatherConditions">
                <p>{weatherConditions}</p>
            </div>
        </div>
    );
}
export default MainDisplay;